import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { getSession, closeDriver, runQuery } from '../src/config/database.js';
import { fetchAniListData } from '../src/utils/anilist.js';
import logger from '../src/utils/logger.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const CACHE_FILE = path.join(__dirname, 'seed-cache.json');
const SCHEMA_FILE = path.join(__dirname, 'schema.cypher');

/**
 * 1. Read and apply schema constraints directly from schema.cypher
 */
const applyConstraints = async (session) => {
  logger.info('Reading schema constraints from schema.cypher...');
  const schemaCypher = fs.readFileSync(SCHEMA_FILE, 'utf-8');
  const statements = schemaCypher
    .split(';')
    .map((s) => s.trim())
    .filter((s) => s.length > 0 && !s.startsWith('//'));

  for (const statement of statements) {
    try {
      await session.run(statement);
    } catch (err) {
      logger.warn(`Constraint notice: ${err.message}`);
    }
  }
  logger.info('Schema constraints verified');
};

/**
 * Transforms raw AniList anime objects into a clean format for Cypher batch insertion
 */
const formatAnimeForGraph = (anime) => ({
  id: anime.id,
  titleRomaji: anime.title?.romaji || '',
  titleEnglish: anime.title?.english || anime.title?.romaji || '',
  titleNative: anime.title?.native || '',
  description: anime.description || '',
  format: anime.format || 'TV',
  status: anime.status || '',
  episodes: anime.episodes || 0,
  duration: anime.duration || 0,
  averageScore: anime.averageScore || 0,
  popularity: anime.popularity || 0,
  season: anime.season || '',
  seasonYear: anime.seasonYear || 0,
  coverImage: anime.coverImage?.large || anime.coverImage?.medium || '',
  bannerImage: anime.bannerImage || '',
  genres: anime.genres || [],
  tags: (anime.tags || [])
    .filter((t) => !t.isMediaSpoiler && t.rank >= 60)
    .slice(0, 6)
    .map((t) => ({ name: t.name, rank: t.rank || 60 })),
  // Keep ONLY actual animation studios (exclude TV networks, publishers, sponsors)
  studios: (anime.studios?.edges || [])
    .filter((e) => e.node && (e.node.isAnimationStudio || e.isMain))
    .map((e) => ({ id: e.node.id, name: e.node.name })),
  // Keep ONLY Series/Chief Directors (exclude sound directors, art directors, animation directors)
  directors: (anime.staff?.edges || [])
    .filter((e) => {
      if (!e.node || !e.role) return false;
      const r = e.role.trim();
      return r === 'Director' || r === 'Series Director' || r === 'Chief Director';
    })
    .map((e) => ({ id: e.node.id, name: e.node.name?.full || 'Director' })),
  characters: (anime.characters?.edges || [])
    .filter((e) => e.node)
    .slice(0, 4)
    .map((e) => ({
      id: e.node.id,
      name: e.node.name?.full || 'Character',
      voiceActor: e.voiceActors?.[0]
        ? { id: e.voiceActors[0].id, name: e.voiceActors[0].name?.full || 'Voice Actor' }
        : null
    }))
});

/**
 * 2. Ingest anime batch into CognoDB in a single efficient Cypher query
 */
const batchIngestAnime = async (session, formattedBatch) => {
  const batchQuery = `
    UNWIND $batch AS item
    MERGE (a:Anime {id: item.id})
    SET a.titleRomaji = item.titleRomaji,
        a.titleEnglish = item.titleEnglish,
        a.titleNative = item.titleNative,
        a.description = item.description,
        a.format = item.format,
        a.status = item.status,
        a.episodes = item.episodes,
        a.duration = item.duration,
        a.averageScore = item.averageScore,
        a.popularity = item.popularity,
        a.season = item.season,
        a.seasonYear = item.seasonYear,
        a.coverImage = item.coverImage,
        a.bannerImage = item.bannerImage

    // Attach Genres
    FOREACH (gName IN item.genres |
      MERGE (g:Genre {name: gName})
      MERGE (a)-[:HAS_GENRE]->(g)
    )

    // Attach Tags with rank property
    FOREACH (t IN item.tags |
      MERGE (tag:Tag {name: t.name})
      MERGE (a)-[rt:HAS_TAG]->(tag)
      SET rt.rank = t.rank
    )

    // Attach Animation Studios
    FOREACH (s IN item.studios |
      MERGE (studio:Studio {id: s.id})
      SET studio.name = s.name
      MERGE (a)-[:PRODUCED_BY]->(studio)
    )

    // Attach Series Directors
    FOREACH (d IN item.directors |
      MERGE (staff:Staff {id: d.id})
      SET staff.name = d.name
      MERGE (a)-[:DIRECTED_BY]->(staff)
    )

    // Attach Characters
    FOREACH (c IN item.characters |
      MERGE (char:Character {id: c.id})
      SET char.name = c.name
      MERGE (a)-[:FEATURES]->(char)
    )
  `;

  await session.run(batchQuery, { batch: formattedBatch });

  // Connect Voice Actors to Characters
  const vaQuery = `
    UNWIND $batch AS item
    UNWIND item.characters AS c
    WITH c WHERE c.voiceActor IS NOT NULL
    MATCH (char:Character {id: c.id})
    MERGE (va:VoiceActor {id: c.voiceActor.id})
    SET va.name = c.voiceActor.name
    MERGE (char)-[:VOICED_BY]->(va)
  `;
 
  await session.run(vaQuery, { batch: formattedBatch });
};

/**
 * 3. Main Seeder Execution
 */
const seed = async () => {
  logger.info('=== Starting Clean CognoDB Seeder for AniGraph ===');
  const session = getSession();

  try {
    // Step 1: Clean previous graph data to remove old non-animation studios
    logger.info('Cleaning previous graph data...');
    await session.run('MATCH (n) DETACH DELETE n');

    // Step 2: Apply constraints from schema.cypher
    await applyConstraints(session);

    // Step 3: Load Anime Data (from cache or AniList API)
    let rawAnimeList = [];

    // Safely check if cache file exists AND has valid non-empty JSON data
    if (fs.existsSync(CACHE_FILE)) {
      try {
        const raw = fs.readFileSync(CACHE_FILE, 'utf-8');
        if (raw.trim().length > 0) {
          const parsed = JSON.parse(raw);
          if (Array.isArray(parsed) && parsed.length > 0) {
            rawAnimeList = parsed;
            logger.info(`Loading cached anime data (${rawAnimeList.length} records) from ${CACHE_FILE}...`);
          }
        }
      } catch (err) {
        logger.warn('Cache file was empty or corrupted. Will re-fetch from AniList API.');
      }
    }

    // Fallback: If cache didn't exist or was empty/corrupted, fetch from AniList
    if (rawAnimeList.length === 0) {
      logger.info('Fetching 250 top anime from AniList GraphQL API (5 pages of 50)...');
      rawAnimeList = [];
      for (let p = 1; p <= 5; p++) {
        const pageData = await fetchAniListData(p, 50);
        rawAnimeList.push(...pageData);
        logger.info(`Fetched page ${p}/5 (${rawAnimeList.length} total anime so far)`);
        if (p < 5) await new Promise((resolve) => setTimeout(resolve, 350));
      }
      fs.writeFileSync(CACHE_FILE, JSON.stringify(rawAnimeList, null, 2));
      logger.info(`Saved ${rawAnimeList.length} fresh anime records to ${CACHE_FILE}`);
    }

    logger.info(`Formatting ${rawAnimeList.length} anime records for graph ingestion...`);
    const formattedList = rawAnimeList.map(formatAnimeForGraph);

    // Step 4: Batch ingest into CognoDB
    logger.info('Executing batch ingestion into CognoDB...');
    await batchIngestAnime(session, formattedList);
    logger.info('Batch ingestion completed successfully!');

    // Step 5: Display Graph Statistics cleanly
    const animeCount = (await runQuery('MATCH (a:Anime) RETURN count(a) AS count'))[0].count;
    const studioCount = (await runQuery('MATCH (s:Studio) RETURN count(s) AS count'))[0].count;
    const directorCount = (await runQuery('MATCH (st:Staff) RETURN count(st) AS count'))[0].count;
    const genreCount = (await runQuery('MATCH (g:Genre) RETURN count(g) AS count'))[0].count;
    const relCount = (await runQuery('MATCH ()-[r]->() RETURN count(r) AS count'))[0].count;

    logger.info('=== CognoDB Seeding Summary ===');
    logger.info(`Anime Nodes:         ${animeCount}`);
    logger.info(`Animation Studios:   ${studioCount}`);
    logger.info(`Series Directors:    ${directorCount}`);
    logger.info(`Genre Nodes:         ${genreCount}`);
    logger.info(`Total Relationships: ${relCount}`);

  } catch (error) {
    logger.error('Seeding error:', error.message);
  } finally {
    await session.close();
    await closeDriver();
    logger.info('Done! CognoDB graph database is clean and ready.');
  }
};

seed();

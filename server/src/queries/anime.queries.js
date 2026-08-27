/**
 * Anime Cypher Queries
 */

// 1. Get all anime (ordered by score, paginated)
export const GET_ALL_ANIME = `
  MATCH (a:Anime)
  OPTIONAL MATCH (a)-[:HAS_GENRE]->(g:Genre)
  OPTIONAL MATCH (a)-[:PRODUCED_BY]->(s:Studio)
  RETURN a.id AS id,
         a.titleRomaji AS titleRomaji,
         a.titleEnglish AS titleEnglish,
         a.format AS format,
         a.episodes AS episodes,
         a.averageScore AS averageScore,
         a.seasonYear AS seasonYear,
         a.coverImage AS coverImage,
         collect(DISTINCT g.name) AS genres,
         collect(DISTINCT s.name) AS studios
  ORDER BY a.averageScore DESC
  SKIP $skip
  LIMIT $limit
`;

// 2. Search anime across titles, animation studios, directors, genres, and tags (paginated)
export const SEARCH_ANIME = `
  MATCH (a:Anime)
  OPTIONAL MATCH (a)-[:PRODUCED_BY]->(s:Studio)
  OPTIONAL MATCH (a)-[:DIRECTED_BY]->(st:Staff)
  OPTIONAL MATCH (a)-[:HAS_GENRE]->(g:Genre)
  OPTIONAL MATCH (a)-[:HAS_TAG]->(t:Tag)
  WITH a,
       collect(DISTINCT toLower(coalesce(s.name, ''))) AS studios,
       collect(DISTINCT toLower(coalesce(st.name, ''))) AS directors,
       collect(DISTINCT toLower(coalesce(g.name, ''))) AS genres,
       collect(DISTINCT toLower(coalesce(t.name, ''))) AS tags
  WHERE toLower(coalesce(a.titleRomaji, '')) CONTAINS toLower($search)
     OR toLower(coalesce(a.titleEnglish, '')) CONTAINS toLower($search)
     OR any(item IN studios WHERE item CONTAINS toLower($search))
     OR any(item IN directors WHERE item CONTAINS toLower($search))
     OR any(item IN genres WHERE item CONTAINS toLower($search))
     OR any(item IN tags WHERE item CONTAINS toLower($search))
  OPTIONAL MATCH (a)-[:HAS_GENRE]->(g2:Genre)
  OPTIONAL MATCH (a)-[:PRODUCED_BY]->(s2:Studio)
  RETURN a.id AS id,
         a.titleRomaji AS titleRomaji,
         a.titleEnglish AS titleEnglish,
         a.format AS format,
         a.episodes AS episodes,
         a.averageScore AS averageScore,
         a.seasonYear AS seasonYear,
         a.coverImage AS coverImage,
         collect(DISTINCT g2.name) AS genres,
         collect(DISTINCT s2.name) AS studios
  ORDER BY a.averageScore DESC
  SKIP $skip
  LIMIT $limit
`;

// 3. Get single anime details by ID
export const GET_ANIME_BY_ID = `
  MATCH (a:Anime {id: $id})
  OPTIONAL MATCH (a)-[:HAS_GENRE]->(g:Genre)
  OPTIONAL MATCH (a)-[rt:HAS_TAG]->(t:Tag)
  OPTIONAL MATCH (a)-[:PRODUCED_BY]->(s:Studio)
  OPTIONAL MATCH (a)-[:DIRECTED_BY]->(d:Staff)
  OPTIONAL MATCH (a)-[:FEATURES]->(c:Character)
  OPTIONAL MATCH (c)-[:VOICED_BY]->(va:VoiceActor)
  RETURN a.id AS id,
         a.titleRomaji AS titleRomaji,
         a.titleEnglish AS titleEnglish,
         a.titleNative AS titleNative,
         a.description AS description,
         a.format AS format,
         a.status AS status,
         a.episodes AS episodes,
         a.duration AS duration,
         a.averageScore AS averageScore,
         a.popularity AS popularity,
         a.season AS season,
         a.seasonYear AS seasonYear,
         a.coverImage AS coverImage,
         a.bannerImage AS bannerImage,
         collect(DISTINCT g.name) AS genres,
         collect(DISTINCT { name: t.name, rank: coalesce(rt.rank, 60) }) AS tags,
         collect(DISTINCT s.name) AS studios,
         collect(DISTINCT d.name) AS directors,
         collect(DISTINCT {character: c.name, voiceActor: va.name}) AS cast
`;

// 4. Multi-hop graph recommendation with tag-rank weighted scoring and explainability
export const GET_ANIME_RECOMMENDATIONS = `
  MATCH (target:Anime {id: $id})
  MATCH (target)-[r1]->(shared)<-[r2]-(rec:Anime)
  WHERE rec.id <> target.id
  
  WITH rec, 
       collect(DISTINCT {
         type: type(r1), 
         name: coalesce(shared.name, labels(shared)[0])
       }) AS reasons,
       round(sum(CASE type(r1)
         WHEN 'DIRECTED_BY' THEN 6.0
         WHEN 'PRODUCED_BY' THEN 4.0
         WHEN 'HAS_TAG'     THEN (coalesce(r1.rank, 60) * coalesce(r2.rank, 60)) / 1000.0
         WHEN 'HAS_GENRE'   THEN 2.0
         ELSE 1.0
       END)) AS matchScore
  
  RETURN rec.id AS id,
         rec.titleRomaji AS titleRomaji,
         rec.titleEnglish AS titleEnglish,
         rec.coverImage AS coverImage,
         rec.averageScore AS averageScore,
         rec.format AS format,
         rec.seasonYear AS seasonYear,
         matchScore,
         reasons
  ORDER BY matchScore DESC, rec.averageScore DESC
  LIMIT $limit
`;

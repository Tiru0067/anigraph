/**
 * Anime Cypher Queries (Parameterized)
 */

// Get all anime with pagination / limit
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
  LIMIT $limit
`;

// Search anime by title
export const SEARCH_ANIME = `
  MATCH (a:Anime)
  WHERE toLower(a.titleRomaji) CONTAINS toLower($search) 
     OR toLower(a.titleEnglish) CONTAINS toLower($search)
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
  LIMIT 20
`;

// Get single anime details by ID
export const GET_ANIME_BY_ID = `
  MATCH (a:Anime {id: $id})
  OPTIONAL MATCH (a)-[:HAS_GENRE]->(g:Genre)
  OPTIONAL MATCH (a)-[:HAS_TAG]->(t:Tag)
  OPTIONAL MATCH (a)-[:PRODUCED_BY]->(s:Studio)
  OPTIONAL MATCH (a)-[:DIRECTED_BY]->(d:Staff)
  OPTIONAL MATCH (a)-[:FEATURES]->(c:Character)-[:VOICED_BY]->(va:VoiceActor)
  RETURN a.id AS id,
         a.titleRomaji AS titleRomaji,
         a.titleEnglish AS titleEnglish,
         a.description AS description,
         a.format AS format,
         a.episodes AS episodes,
         a.averageScore AS averageScore,
         a.seasonYear AS seasonYear,
         a.coverImage AS coverImage,
         a.bannerImage AS bannerImage,
         collect(DISTINCT g.name) AS genres,
         collect(DISTINCT t.name) AS tags,
         collect(DISTINCT s.name) AS studios,
         collect(DISTINCT d.name) AS directors,
         collect(DISTINCT {character: c.name, voiceActor: va.name}) AS cast
`;

// Multi-hop path-based recommendations with explanation
export const GET_ANIME_RECOMMENDATIONS = `
  MATCH (target:Anime {id: $id})
  
  // Hop 1 & 2: Match connected shared entities (Studio, Director, Tags, Genres)
  MATCH (target)-[r1]->(shared)<-[r2]-(rec:Anime)
  WHERE rec.id <> target.id
  
  // Calculate weighted score based on relationship type
  WITH rec, 
       collect(DISTINCT {
         type: type(r1), 
         name: coalesce(shared.name, labels(shared)[0])
       }) AS connections,
       sum(CASE type(r1)
         WHEN 'DIRECTED_BY' THEN 5
         WHEN 'PRODUCED_BY' THEN 4
         WHEN 'HAS_TAG' THEN 2
         WHEN 'HAS_GENRE' THEN 1
         ELSE 1
       END) AS score
  
  RETURN rec.id AS id,
         rec.titleRomaji AS titleRomaji,
         rec.titleEnglish AS titleEnglish,
         rec.coverImage AS coverImage,
         rec.averageScore AS averageScore,
         score,
         connections
  ORDER BY score DESC, rec.averageScore DESC
  LIMIT $limit
`;

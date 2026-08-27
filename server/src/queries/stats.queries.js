/**
 * Stats Cypher Queries
 */

export const GET_GRAPH_STATS = `
  MATCH (a:Anime)
  WITH count(a) AS totalAnime
  MATCH (s:Studio)
  WITH totalAnime, count(s) AS totalStudios
  MATCH (g:Genre)
  WITH totalAnime, totalStudios, count(g) AS totalGenres
  MATCH ()-[r]->()
  RETURN 
    totalAnime,
    totalStudios,
    totalGenres,
    count(r) AS totalRelationships
`;

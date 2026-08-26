/**
 * Stats Cypher Queries
 */
export const GET_GRAPH_STATS = `
  MATCH (a:Anime)
  OPTIONAL MATCH (s:Studio)
  OPTIONAL MATCH (g:Genre)
  OPTIONAL MATCH ()-[r]->()
  RETURN 
    count(DISTINCT a) AS totalAnime,
    count(DISTINCT s) AS totalStudios,
    count(DISTINCT g) AS totalGenres,
    count(r) AS totalRelationships
`;

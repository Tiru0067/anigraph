import { runQuery } from '../config/database.js';
import { GET_GRAPH_STATS } from '../queries/stats.queries.js';

/**
 * Stats Controller
 * Returns graph summary metrics from CognoDB
 */
export const getStats = async (req, res, next) => {
  try {
    const records = await runQuery(GET_GRAPH_STATS);
    const data = records[0] || {
      totalAnime: 0,
      totalStudios: 0,
      totalGenres: 0,
      totalRelationships: 0
    };

    res.status(200).json({
      success: true,
      data
    });
  } catch (error) {
    next(error);
  }
};

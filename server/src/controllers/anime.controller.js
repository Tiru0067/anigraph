import { runQuery } from '../config/database.js';
import {
  GET_ALL_ANIME,
  SEARCH_ANIME,
  GET_ANIME_BY_ID,
  GET_ANIME_RECOMMENDATIONS
} from '../queries/anime.queries.js';

/**
 * Get anime list with optional search query
 * Route: GET /api/anime?search=...&limit=...
 */
export const getAnimeList = async (req, res, next) => {
  try {
    const { search, limit } = req.query;
    const limitNum = parseInt(limit, 10) || 50;

    let records;
    if (search && search.trim().length > 0) {
      records = await runQuery(SEARCH_ANIME, { search: search.trim() });
    } else {
      records = await runQuery(GET_ALL_ANIME, { limit: limitNum });
    }

    res.status(200).json({
      success: true,
      count: records.length,
      data: records
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Get anime by ID
 * Route: GET /api/anime/:id
 */
export const getAnimeById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const animeId = parseInt(id, 10);

    if (isNaN(animeId)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid anime ID parameter'
      });
    }

    const records = await runQuery(GET_ANIME_BY_ID, { id: animeId });

    if (!records || records.length === 0) {
      return res.status(404).json({
        success: false,
        message: `Anime with ID ${id} not found`
      });
    }

    res.status(200).json({
      success: true,
      data: records[0]
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Get recommendations for a specific anime
 * Route: GET /api/anime/:id/recommendations?limit=...
 */
export const getAnimeRecommendations = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { limit } = req.query;
    const animeId = parseInt(id, 10);
    const limitNum = parseInt(limit, 10) || 6;

    if (isNaN(animeId)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid anime ID parameter'
      });
    }

    const records = await runQuery(GET_ANIME_RECOMMENDATIONS, {
      id: animeId,
      limit: limitNum
    });

    res.status(200).json({
      success: true,
      animeId,
      count: records.length,
      data: records
    });
  } catch (error) {
    next(error);
  }
};

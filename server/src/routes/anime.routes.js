import express from 'express';
import {
  getAnimeList,
  getAnimeById,
  getAnimeRecommendations
} from '../controllers/anime.controller.js';

const router = express.Router();

// GET /api/anime (list with ?search=...)
router.get('/', getAnimeList);

// GET /api/anime/:id (details)
router.get('/:id', getAnimeById);

// GET /api/anime/:id/recommendations (graph recommendations)
router.get('/:id/recommendations', getAnimeRecommendations);

export default router;

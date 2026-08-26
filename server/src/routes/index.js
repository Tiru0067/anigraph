import express from 'express';
import animeRoutes from './anime.routes.js';
import statsRoutes from './stats.routes.js';

const router = express.Router();

// Mount API resource routes
router.use('/anime', animeRoutes);
router.use('/stats', statsRoutes);

export default router;

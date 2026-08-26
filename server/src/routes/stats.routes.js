import express from 'express';
import { getStats } from '../controllers/stats.controller.js';

const router = express.Router();

// GET /api/stats
router.get('/', getStats);

export default router;

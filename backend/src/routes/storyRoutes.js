import express from 'express';
import isAuthenticated from '../middleware/isAuthenticated.js';
import upload from '../middleware/multer.js';
import { createStory, getFeedStories, viewStory } from '../controllers/storyController.js';

const router = express.Router();

router.route('/create').post(isAuthenticated, upload.single('image'), createStory);
router.route('/all').get(isAuthenticated, getFeedStories);
router.route('/:id/view').post(isAuthenticated, viewStory);

export default router;

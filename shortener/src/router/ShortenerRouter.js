import express from 'express';

import ShortenerController from '../controller/ShortenerController.js';
import validation from '../middleware/ValidationMiddleware.js';
import ShortenerValidation from '../validation/ShortenerValidation.js';

const router = express.Router();
const shortenerController = new ShortenerController();

// Get all shorteners
router.get('/api/shortener', shortenerController.index);

// Get shortener by id
router.get('/api/shortener/:id', shortenerController.getOne);

// Insert shortener
router.post('/api/shortener', validation(ShortenerValidation), shortenerController.store);

// Update user by id
router.put('/api/shortener/:id', validation(ShortenerValidation), shortenerController.update);

// Remove shortener by id
router.delete('/api/shortener/:id', shortenerController.remove);

export default router;

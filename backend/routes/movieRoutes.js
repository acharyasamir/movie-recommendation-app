const express = require('express');
const router = express.Router();
const { getMovieByName } = require('../controllers/movieController');
const authMiddleware = require('../middleware/authMiddleware');

router.get('/:name', authMiddleware, getMovieByName);

module.exports = router;

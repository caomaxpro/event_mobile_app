const express = require('express');
const { getUserEvents } = require('../controllers/eventController');
const authMiddleware = require('../middlewares/authMiddleware');
const router = express.Router();

router.get('/events', authMiddleware, getUserEvents);  // Authenticated route to get events for the user

module.exports = router;

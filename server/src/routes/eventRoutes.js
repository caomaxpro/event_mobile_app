const express = require('express');
const {getUserEvents} = require('../controllers/eventController');
const authMiddleware = require('../middlewares/authMiddleware');
const router = express.Router();

router.post('/event', authMiddleware, createEvent);

router.get('/event/:id', authMiddleware, getEventById);

router.put('/event/:id', authMiddleware, updateEvent);

router.delete('/event/:id', authMiddleware, deleteEvent);

router.get('/events', authMiddleware, getEvents);

module.exports = router;

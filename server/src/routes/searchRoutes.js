const express = require('express');
const {getUserData} = require('../controllers/userController');
const authMiddleware = require('../middlewares/authMiddleware');
const router = express.Router();

router.post('/me', authMiddleware, getUserData); // Authenticated route to get user data

module.exports = router;

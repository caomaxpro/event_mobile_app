const express = require('express');
const authMiddleware = require('../middlewares/authMiddleware');
const { register, login, send_mail } = require('../controllers/authController');
const router = express.Router();


router.post('/register', register);
router.post('/login', login);
router.post('/send-email', authMiddleware, send_mail)

module.exports = router;
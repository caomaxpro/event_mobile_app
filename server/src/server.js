const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const eventRoutes = require('./routes/eventRoutes');
const connectDB = require('./db');

const app = express();

const PORT = process.env.PORT || 5000;

const transporter = nodemailer.createTransport({
  service: 'gmail', // hoặc bạn có thể sử dụng các dịch vụ khác như SendGrid, Mailgun, v.v.
  auth: {
    user: 'your-email@gmail.com', // thay bằng email của bạn
    pass: 'your-email-password', // thay bằng mật khẩu email của bạn
  },
});

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);
app.use('/api', eventRoutes);

// MongoDB connection
connectDB();

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = {transport};

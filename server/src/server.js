const express = require('express');
const cors = require('cors')
const bodyParser = require('body-parser');
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const eventRoutes = require('./routes/eventRoutes');
const connectDB = require('./db');

const app = express();

const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);
app.use('/api', eventRoutes);

// MongoDB connection
connectDB()


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect("mongodb+srv://lecao819:EHGj3EGCSySidu2r@eventhub.mi5at.mongodb.net/");
    console.log('MongoDB connected');
  } catch (err) {
    console.error('Error connecting to MongoDB:', err);
    process.exit(1);
  }
};

module.exports = connectDB;

// EHGj3EGCSySidu2r
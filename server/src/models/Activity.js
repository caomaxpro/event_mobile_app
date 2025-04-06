const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const activitySchema = new Schema({
  event: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Event',
    required: true,
  },
  time: {
    type: Date,
    required: [true, 'Event time is required'],
    validate: {
      validator: function (value) {
        return value > Date.now();
      },
      message: 'Event time must be in the future',
    },
  },
  activity: {
    type: String,
    required: [true, 'Activity description is required'],
    trim: true,
  },
  duration: {
    type: Number, // in minutes
    required: false,
    validate: [
      {
        validator: function (value) {
          return value > 0;
        },
        message: 'Duration must be greater than 0 minutes',
      },
      {
        validator: async function (value) {
          // Get the event details
          const event = await mongoose.model('Event').findById(this.event);
          if (!event) return false;

          // Calculate activity end time
          const activityEndTime = new Date(this.time);
          const eventEndTime = new Date(event.event_time);

          // Check if activity ends before event ends
          return (
            this.time >= new Date(event.event_date) &&
            activityEndTime <= eventEndTime
          );
        },
        message: 'Activity must be within event start and end time',
      },
    ],
  },
  location: {
    type: String,
    required: false,
    trim: true,
  },
  description: {
    type: String,
    required: false,
    trim: true,
  },
  status: {
    type: String,
    enum: ['scheduled', 'in-progress', 'completed', 'cancelled'],
    default: 'scheduled',
  },
});

const Activity = mongoose.model('Activity', activitySchema);

module.exports = Activity;

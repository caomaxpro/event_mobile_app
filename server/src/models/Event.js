const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const eventSchema = new Schema({
  title: {
    type: String,
    required: [true, 'Title is required'],
    trim: true,
  },
  description: {
    type: String,
    // required: [true, 'Description is required'],
    trim: true,
  },
  creation_date: {
    type: String,
    required: [true, 'Creation date is required'],
    default: new Date().toISOString(),
  },
  start_time: {
    type: String,
    required: [true, 'Event time is required'],
    validate: {
      validator: function (value) {
        return new Date(value) > new Date(); // Event date must be in the future
      },
      message: 'Event time must be in the future',
    },
  },
  end_time: {
    type: String,
    required: [true, 'Event time is required'],
    validate: [
      {
        validator: function (value) {
          return new Date(value) > new Date(); // Event date must be in the future
        },
        message: 'Event time must be in the future',
      },
      {
        validator: function (value) {
          return new Date(value) > new Date(this.start_time);
        },
        message: 'End time must be after start time',
      },
    ],
  },
  total_tickets: {
    type: Number,
    required: [true, 'Total tickets are required'],
    min: [1, 'Total tickets must be at least 1'],
  },
  total_discount_tickets: {
    type: Number,
    required: [true, 'Total discount tickets are required'],
    min: [0, 'Total discount tickets cannot be negative'],
    validate: {
      validator: function (value) {
        return value <= this.total_tickets; // Event date must be in the future
      },
      message: 'Total discount tickets cannot be greater than total tickets',
    },
  },
  discounted_value: {
    type: Number,
    default: 0.05,
    required: [true, 'Discounted tickets are required'],
    min: [0, 'Discounted tickets cannot be negative'],
  },
  price: {
    type: Number,
    required: [true, 'Price is required'],
    min: [0, 'Price cannot be negative'],
  },
  price_after_tax: {
    type: Number,
    required: [true, 'Price after tax is required'],
    min: [0, 'Price after tax cannot be negative'],
  },
  location: {
    type: String,
    required: [true, 'Location is required'],
    trim: true,
  },
  participants: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: 'User',
    required: false,
    default: [],
  },
  organizer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: false,
  },
  status: {
    type: String,
    enum: ['active', 'inactive'],
    default: 'active',
  },
  type: {
    type: String,
    required: [true, 'Event type is required'],
  },
  tags: {
    type: [String],
    required: [true, 'Event tags are required'],
    default: ['AI', 'Showcase', 'Networking'],
  },
  image: {
    type: String,
    required: [true, 'Event image is required'],
    validate: {
      validator: function (value) {
        const regex = /(http(s)?:)([/|.|\w|\s|-])*\.(?:jpg|jpeg|gif|png|bmp)/;
        return regex.test(value); // Validate URL of the image
      },
      message: 'Invalid image URL format',
    },
  },
  //   event_schedule: [
  //     {
  //       time: {
  //         type: Date,
  //         required: [true, 'Event time is required'],
  //         validate: {
  //           validator: function (value) {
  //             return value > Date.now(); // Activity time must be in the future
  //           },
  //           message: 'Event time must be in the future',
  //         },
  //       },
  //       activity: {
  //         type: String,
  //         required: [true, 'Activity description is required'],
  //         trim: true,
  //       },
  //     },
  //   ],
  address: {
    type: String,
    required: [true, 'Address is required'],
    trim: true,
  },
});

const Event = mongoose.model('Event', eventSchema);

module.exports = Event;

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const eventSchema = new Schema({
  title: {
    type: String,
    required: [true, 'Title is required'],
    trim: true,
  },
  description: {
    type: String,
    required: [true, 'Description is required'],
    trim: true,
  },
  creation_date: {
    type: Date,
    required: [true, 'Creation date is required'],
    default: Date.now,
  },
  event_date: {
    type: Date,
    required: [true, 'Event date is required'],
    validate: {
      validator: function (value) {
        return value > Date.now() // Event date must be in the future
      },
      message: 'Event date must be in the future',
    },
  },
  total_tickets: {
    type: Number,
    required: [true, 'Total tickets are required'],
    min: [1, 'Total tickets must be at least 1'],
  },
  discounted_tickets: {
    type: Number,
    required: [true, 'Discounted tickets are required'],
    min: [0, 'Discounted tickets cannot be negative'],
  },
  price: {
    type: Number,
    required: [true, 'Price is required'],
    min: [0, 'Price cannot be negative'],
  },
  location: {
    type: String,
    required: [true, 'Location is required'],
    trim: true,
  },
  participants: {
    type: [String],
    default: [],
    validate: {
      validator: function (value) {
        return Array.isArray(value) // Ensure participants is an array
      },
      message: 'Participants must be an array',
    },
  },
  organizers: {
    type: [String],
    default: [],
    validate: {
      validator: function (value) {
        return Array.isArray(value) // Ensure organizers is an array
      },
      message: 'Organizers must be an array',
    },
  },
  ticket_status: {
    type: String,
    enum: ['active', 'inactive'],
    default: 'active',
  },
  event_status: {
    type: String,
    enum: ['active', 'inactive'],
    default: 'active',
  },
  event_type: {
    type: String,
    required: [true, 'Event type is required'],
  },
  event_tags: {
    type: [String],
    required: [true, 'Event tags are required'],
    default: ['AI', 'Showcase', 'Networking'],
  },
  event_image: {
    type: String,
    required: [true, 'Event image is required'],
    validate: {
      validator: function (value) {
        const regex = /(http(s)?:)([/|.|\w|\s|-])*\.(?:jpg|jpeg|gif|png|bmp)/
        return regex.test(value) // Validate URL of the image
      },
      message: 'Invalid image URL format',
    },
  },
  registration_deadline: {
    type: Date,
    required: [true, 'Registration deadline is required'],
  },
  event_schedule: [
    {
      time: {
        type: Date,
        required: [true, 'Event time is required'],
        validate: {
          validator: function (value) {
            return value > Date.now() // Activity time must be in the future
          },
          message: 'Event time must be in the future',
        },
      },
      activity: {
        type: String,
        required: [true, 'Activity description is required'],
        trim: true,
      },
    },
  ],

  address: {
    type: String,
    required: [true, 'Address is required'],
    trim: true,
  },

  ticket_sales_end_date: {
    type: Date,
    required: [true, 'Ticket sales end date is required'],
    validate: {
      validator: function (value) {
        return value > Date.now() // Sales end date must be in the future
      },
      message: 'Ticket sales end date must be in the future',
    },
  },
})

const Event = mongoose.model('Event', eventSchema)

module.exports = Event

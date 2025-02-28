const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  full_name: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 100
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error('Invalid email format');
      }
    }
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  },
  avatar: {
    type: String,
    default: ''
  },
  role: {
    type: String,
    enum: ['admin', 'participant'],
    default: 'participant'
  },
  bio: {
    type: String,
    maxlength: 300
  },
  phone: {
    type: String,
    validate(value) {
      if (!validator.isMobilePhone(value, 'any', { strictMode: false })) {
        throw new Error('Invalid phone number');
      }
    }
  },
  
  location: {
    type: String,
    maxlength: 100
  },

  social_links: {
    facebook: {
      type: String,
      validate(value) {
        if (value && !validator.isURL(value)) {
          throw new Error('Invalid URL format for Facebook');
        }
      }
    },
    github: {
      type: String,
      validate(value) {
        if (value && !validator.isURL(value)) {
          throw new Error('Invalid URL format for GitHub');
        }
      }
    }
  },
  events_created: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: 'Event',
    default: []
  },
  events_joined: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: 'Event',
    default: []
  },
  join_date: {
    type: Date,
    default: Date.now
  },
  last_login: {
    type: Date
  },
  status: {
    type: String,
    enum: ['active', 'inactive'],
    default: 'active'
  },
  is_verified: {
    type: Boolean,
    default: false
  },
  subscription_status: {
    type: String,
    enum: ['free', 'premium'],
    default: 'free'
  },
  payment_history: {
    type: [Object],
    default: []
  }
});

// Hash password before saving
userSchema.pre('save', async function (next) {
  const user = this;
  if (user.isModified('password')) {
    user.password = await bcrypt.hash(user.password, 8);
  }
  next();
});

const User = mongoose.model('User', userSchema);

module.exports = User;

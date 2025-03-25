const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, 'Full name is required'],
    minlength: [3, 'Full name must be at least 3 characters'],
    maxlength: [100, 'Full name cannot exceed 100 characters'],
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    validate: {
      validator: function (value) {
        // Basic email format validation using regex
        const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
        return emailRegex.test(value);
      },
      message: 'Invalid email format',
    },
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: [8, 'Password must be at least 8 characters'],
    validate: {
      validator: function (value) {
        // Regular expression for password validation
        const passwordRegex =
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        return passwordRegex.test(value);
      },
      message:
        'Password must be at least 8 characters long, contain at least one uppercase letter, one lowercase letter, one number, and one special character.',
    },
  },
  profile_picture: {
    type: String,
    default: '',
  },
  role: {
    type: String,
    enum: {
      values: ['admin', 'user'],
      message: 'Role must be either "admin", or "user"',
    },
    default: 'user',
  },
  bio: {
    type: String,
    maxlength: [300, 'Bio cannot exceed 300 characters'],
  },
  phone_number: {
    type: String,
    validate: {
      validator: function (value) {
        // Basic phone number validation (using a regex for international phone numbers)
        const phoneRegex = /^\+?[1-9]\d{1,14}$/;
        return !value || phoneRegex.test(value);
      },
      message: 'Invalid phone number format',
    },
  },
  location: {
    type: String,
    maxlength: [100, 'Location cannot exceed 100 characters'],
  },
  social_links: {
    facebook: {
      type: String,
      validate: {
        validator: function (value) {
          // Simple URL validation using regex
          const urlRegex =
            /^(https?:\/\/)?([\w\-]+(\.[\w\-]+)+)([\w\-._~:/?#[\]@!$&'()*+,;=.])*/;
          return !value || urlRegex.test(value);
        },
        message: 'Invalid URL format for Facebook',
      },
    },
    github: {
      type: String,
      validate: {
        validator: function (value) {
          // Simple URL validation using regex
          const urlRegex =
            /^(https?:\/\/)?([\w\-]+(\.[\w\-]+)+)([\w\-._~:/?#[\]@!$&'()*+,;=.])*/;
          return !value || urlRegex.test(value);
        },
        message: 'Invalid URL format for GitHub',
      },
    },
  },
  events_created: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: 'Event',
    default: [],
  },
  events_joined: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: 'Event',
    default: [],
  },
  join_date: {
    type: Date,
    default: Date.now,
  },
  last_login: {
    type: Date,
  },
  account_status: {
    type: String,
    enum: {
      values: ['active', 'inactive'],
      message: 'Account status must be either "active" or "inactive"',
    },
    default: 'active',
  },
  is_verified: {
    type: Boolean,
    default: false,
  },
  subscription_plan: {
    type: String,
    enum: {
      values: ['free', 'premium'],
      message: 'Subscription plan must be either "free" or "premium"',
    },
    default: 'free',
  },
  payment_history: [{type: mongoose.Schema.Types.ObjectId, ref: 'Transaction'}],
});

// Hash password before saving
// Password validation before hashing
userSchema.pre('save', async function (next) {
  const user = this;

  // Check if the password is being modified
  if (user.isModified('password')) {
    // Hash the password if it's valid
    user.password = await bcrypt.hash(user.password, 8);
  }

  next();
});

userSchema.pre('save', function (next) {
  if (!this.isNew && this.isModified('role') && this.role !== 'participant') {
    return next(new Error('Only admins can change roles.'));
  }
  next();
});

userSchema.pre('findOneAndUpdate', function (next) {
  const update = this.getUpdate();
  if (update.role && update.role !== 'participant') {
    return next(new Error('Only admins can change roles.'));
  }
  next();
});

const User = mongoose.model('User', userSchema);

module.exports = User;

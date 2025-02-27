const User = require('../models/User');

// Get user data
exports.getUserData = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);  // req.user.id will come from the authentication middleware
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};
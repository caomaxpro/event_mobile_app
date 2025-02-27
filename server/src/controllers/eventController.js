const Event = require('../models/Event');

// Get events data for the user
exports.getUserEvents = async (req, res) => {
  try {
    const events = await Event.find({ user: req.user.id });  // Get events for the authenticated user
    res.status(200).json(events);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};
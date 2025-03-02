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

exports.createEvent = async (req, res) => {
  try {
    // Destructure data from the request body
    const {
      title,
      description,
      event_date,
      total_tickets,
      discounted_tickets,
      price,
      location,
      participants,
      organizers,
      ticket_status,
      event_status,
      event_type,
      event_tags,
      event_image,
      registration_deadline,
      event_schedule,
      address,
      ticket_sales_end_date,
    } = req.body;

    // Create new event instance
    const newEvent = new Event({
      title,
      description,
      event_date,
      total_tickets,
      discounted_tickets,
      price,
      location,
      participants,
      organizers,
      ticket_status,
      event_status,
      event_type,
      event_tags,
      event_image,
      registration_deadline,
      event_schedule,
      address,
      ticket_sales_end_date,
    });

    // Save event to the database
    await newEvent.save();

    // Respond with success message
    res.status(201).json({
      message: 'Event created successfully!',
      event: newEvent,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error, unable to create event' });
  }
};

const Event = require("../models/Event");

exports.createEvent = async (req, res) => {
  try {
    const event = new Event(req.body);

    await event.save();
    res.status(201).send(event);
  } catch (error) {
    res.status(500).json({ message: "Error creating event", error });
  }
};

exports.getEvents = async (req, res) => {
  try {
    const events = await Event.find({ isDeleted: false }).populate("attendees");
    res.send(events);
  } catch (error) {
    res.status(500).json({ message: "Error fetching events", error });
  }
};

exports.updateEvent = async (req, res) => {
  const { eventId } = req.params;
  const { title, description, date } = req.body;

  try {
    const event = await Event.findById(eventId);
    if (!event || event.createdBy.toString() !== req.user.id) {
      return res.status(404).json({ message: "Event not found" });
    }

    event.title = title;
    event.description = description;
    event.date = date;

    await event.save();
    res.json(event);
  } catch (error) {
    res.status(500).json({ message: "Error updating event", error });
  }
};

exports.softDeleteEvent = async (req, res) => {
  const { eventId } = req.params;

  try {
    const event = await Event.findById(eventId);
    if (!event || event.createdBy.toString() !== req.user.id) {
      return res.status(404).json({ message: "Event not found" });
    }

    // event.isDeleted = true;
    await event.save();
    res.json({ message: "Event soft deleted" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting event", error });
  }
};

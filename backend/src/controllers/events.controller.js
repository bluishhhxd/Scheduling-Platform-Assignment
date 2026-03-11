import * as eventsService from "../services/events.service.js";

export async function getEvents(req, res, next) {
  try {
    const events = await eventsService.listEventTypes();
    res.json(events);
  } catch (error) {
    next(error);
  }
}

export async function getEventBySlug(req, res, next) {
  try {
    const event = await eventsService.findEventTypeBySlug(req.params.eventSlug);
    res.json(event);
  } catch (error) {
    next(error);
  }
}

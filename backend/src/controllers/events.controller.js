import * as eventsService from "../services/events.service.js";

function createError(message, statusCode = 400) {
  const error = new Error(message);
  error.statusCode = statusCode;
  return error;
}

function validateEventTypeBody(body) {
  if (!body || typeof body !== "object") {
    throw createError("Request body is required");
  }

  const { name, slug, duration_minutes } = body;

  if (!name || !slug) {
    throw createError("name and slug are required");
  }

  if (!Number.isInteger(Number(duration_minutes)) || Number(duration_minutes) <= 0) {
    throw createError("duration_minutes must be a positive integer");
  }
}

export async function getEvents(req, res, next) {
  try {
    const events = await eventsService.listEventTypes();
    res.json({ data: events });
  } catch (error) {
    next(error);
  }
}

export async function getEventBySlug(req, res, next) {
  try {
    const event = await eventsService.findEventTypeBySlug(req.params.eventSlug);

    if (!event) {
      throw createError("Event type not found", 404);
    }

    res.json({ data: event });
  } catch (error) {
    next(error);
  }
}

export async function createEventType(req, res, next) {
  try {
    validateEventTypeBody(req.body);

    const event = await eventsService.createEventType({
      name: req.body.name.trim(),
      slug: req.body.slug.trim(),
      duration_minutes: Number(req.body.duration_minutes),
      description: req.body.description?.trim() || null
    });

    res.status(201).json({ data: event, message: "Event type created successfully" });
  } catch (error) {
    next(error);
  }
}

export async function updateEventType(req, res, next) {
  try {
    const id = Number(req.params.id);

    if (!Number.isInteger(id) || id <= 0) {
      throw createError("Invalid event type id");
    }

    validateEventTypeBody(req.body);

    const event = await eventsService.updateEventType(id, {
      name: req.body.name.trim(),
      slug: req.body.slug.trim(),
      duration_minutes: Number(req.body.duration_minutes),
      description: req.body.description?.trim() || null
    });

    res.json({ data: event, message: "Event type updated successfully" });
  } catch (error) {
    next(error);
  }
}

export async function removeEventType(req, res, next) {
  try {
    const id = Number(req.params.id);

    if (!Number.isInteger(id) || id <= 0) {
      throw createError("Invalid event type id");
    }

    const event = await eventsService.softDeleteEventType(id);
    res.json({ data: event, message: "Event type deleted successfully" });
  } catch (error) {
    next(error);
  }
}

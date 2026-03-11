import * as bookService from "../services/book.service.js";

function createError(message, statusCode = 400) {
  const error = new Error(message);
  error.statusCode = statusCode;
  return error;
}

function isValidDate(value) {
  return typeof value === "string" && /^\d{4}-\d{2}-\d{2}$/.test(value);
}

function isValidTime(value) {
  return typeof value === "string" && /^([01]\d|2[0-3]):([0-5]\d)$/.test(value);
}

function isValidEmail(value) {
  return typeof value === "string" && /^\S+@\S+\.\S+$/.test(value);
}

function parseStartTime(startTime) {
  if (typeof startTime !== "string") {
    return null;
  }

  const match = startTime.match(/^(\d{4}-\d{2}-\d{2})T(\d{2}:\d{2})/);

  if (!match) {
    return null;
  }

  return {
    date: match[1],
    time: match[2]
  };
}

export async function bookMeeting(req, res, next) {
  try {
    const body = req.body || {};
    const parsedStartTime = parseStartTime(body.startTime);

    const event_slug = body.event_slug || body.eventSlug;
    const date = body.date || parsedStartTime?.date;
    const time = body.time || parsedStartTime?.time;
    const attendee_name = body.attendee_name || body.attendeeName;
    const attendee_email = body.attendee_email || body.attendeeEmail;
    const attendee_notes = body.attendee_notes || body.attendeeNotes;

    if (!event_slug || !attendee_name || !attendee_email) {
      throw createError("eventSlug, attendeeName, and attendeeEmail are required");
    }

    if (!isValidDate(date)) {
      throw createError("date must use YYYY-MM-DD format");
    }

    if (!isValidTime(time)) {
      throw createError("time must use HH:MM format");
    }

    if (!isValidEmail(attendee_email)) {
      throw createError("attendeeEmail must be a valid email address");
    }

    const booking = await bookService.bookMeeting({
      event_slug: event_slug.trim(),
      date,
      time,
      attendee_name: attendee_name.trim(),
      attendee_email: attendee_email.trim(),
      attendee_notes: attendee_notes?.trim() || null
    });

    res.status(201).json({ data: booking, message: "Meeting booked successfully" });
  } catch (error) {
    next(error);
  }
}

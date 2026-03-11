import { getAvailabilityByDay } from "./availability.service.js";
import { findEventTypeBySlug } from "./events.service.js";
import { createBookedMeeting, findConflictingMeeting } from "./meetings.service.js";

function createError(message, statusCode = 500) {
  const error = new Error(message);
  error.statusCode = statusCode;
  return error;
}

function buildDateTime(date, time) {
  const timestamp = new Date(`${date}T${time}:00`);

  if (Number.isNaN(timestamp.getTime())) {
    throw createError("Invalid date or time", 400);
  }

  return timestamp;
}

function isWithinAvailability(startTime, endTime, availabilityWindows, date) {
  return availabilityWindows.some((window) => {
    const windowStart = buildDateTime(date, String(window.start_time).slice(0, 5));
    const windowEnd = buildDateTime(date, String(window.end_time).slice(0, 5));

    return startTime >= windowStart && endTime <= windowEnd;
  });
}

export async function bookMeeting(payload) {
  const eventType = await findEventTypeBySlug(payload.event_slug);

  if (!eventType) {
    throw createError("Event type not found", 404);
  }

  const startTime = buildDateTime(payload.date, payload.time);
  const endTime = new Date(startTime.getTime() + Number(eventType.duration_minutes) * 60 * 1000);
  const dayOfWeek = new Date(`${payload.date}T00:00:00`).getDay();
  const availabilityWindows = await getAvailabilityByDay(dayOfWeek);

  if (!isWithinAvailability(startTime, endTime, availabilityWindows, payload.date)) {
    throw createError("Selected time is outside configured availability", 400);
  }

  const conflictingMeeting = await findConflictingMeeting(startTime, endTime);

  if (conflictingMeeting) {
    throw createError("Selected slot is already booked", 409);
  }

  const meeting = await createBookedMeeting({
    event_type_id: eventType.id,
    attendee_name: payload.attendee_name,
    attendee_email: payload.attendee_email,
    attendee_notes: payload.attendee_notes,
    start_time: startTime,
    end_time: endTime
  });

  return {
    meeting,
    event: {
      id: eventType.id,
      name: eventType.name,
      slug: eventType.slug,
      duration_minutes: eventType.duration_minutes
    }
  };
}

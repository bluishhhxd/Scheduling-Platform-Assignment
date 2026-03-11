import { findEventTypeBySlug } from "./events.service.js";
import { getAvailabilityByDay } from "./availability.service.js";
import { getMeetingsForDate } from "./meetings.service.js";

function createError(message, statusCode = 500) {
  const error = new Error(message);
  error.statusCode = statusCode;
  return error;
}

function pad(value) {
  return String(value).padStart(2, "0");
}

function getDateParts(dateString) {
  const date = new Date(`${dateString}T00:00:00`);

  if (Number.isNaN(date.getTime())) {
    throw createError("Invalid date", 400);
  }

  return {
    date,
    dayOfWeek: date.getDay()
  };
}

function buildDateTime(date, time) {
  return new Date(`${date}T${time}:00`);
}

function formatSlot(date) {
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())} ${pad(date.getHours())}:${pad(date.getMinutes())}`;
}

function overlaps(startA, endA, startB, endB) {
  return startA < endB && endA > startB;
}

export async function generateAvailableSlots({ eventSlug, date }) {
  const eventType = await findEventTypeBySlug(eventSlug);

  if (!eventType) {
    throw createError("Event type not found", 404);
  }

  const { dayOfWeek } = getDateParts(date);
  const availability = await getAvailabilityByDay(dayOfWeek);

  if (availability.length === 0) {
    return {
      event: eventType,
      date,
      slots: []
    };
  }

  const meetings = await getMeetingsForDate(date);
  const availableSlots = [];

  for (const window of availability) {
    const windowStart = buildDateTime(date, String(window.start_time).slice(0, 5));
    const windowEnd = buildDateTime(date, String(window.end_time).slice(0, 5));
    const durationMs = Number(eventType.duration_minutes) * 60 * 1000;

    for (let cursor = new Date(windowStart); cursor.getTime() + durationMs <= windowEnd.getTime(); cursor = new Date(cursor.getTime() + durationMs)) {
      const slotStart = new Date(cursor);
      const slotEnd = new Date(cursor.getTime() + durationMs);
      const isBooked = meetings.some((meeting) =>
        overlaps(slotStart, slotEnd, new Date(meeting.start_time), new Date(meeting.end_time))
      );

      if (!isBooked) {
        availableSlots.push({
          time: `${pad(slotStart.getHours())}:${pad(slotStart.getMinutes())}`,
          start_time: slotStart.toISOString(),
          end_time: slotEnd.toISOString(),
          label: formatSlot(slotStart)
        });
      }
    }
  }

  return {
    event: eventType,
    date,
    slots: availableSlots
  };
}

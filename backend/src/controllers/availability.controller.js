import * as availabilityService from "../services/availability.service.js";

function createError(message, statusCode = 400) {
  const error = new Error(message);
  error.statusCode = statusCode;
  return error;
}

function isValidTime(value) {
  return typeof value === "string" && /^([01]\d|2[0-3]):([0-5]\d)$/.test(value);
}

function validateAvailabilityBody(body) {
  if (!Array.isArray(body)) {
    throw createError("Availability payload must be an array");
  }

  for (const slot of body) {
    if (!Number.isInteger(Number(slot.day_of_week)) || Number(slot.day_of_week) < 0 || Number(slot.day_of_week) > 6) {
      throw createError("day_of_week must be an integer between 0 and 6");
    }

    if (!isValidTime(slot.start_time) || !isValidTime(slot.end_time)) {
      throw createError("start_time and end_time must use HH:MM format");
    }

    if (slot.start_time >= slot.end_time) {
      throw createError("start_time must be earlier than end_time");
    }
  }
}

export async function getAvailability(req, res, next) {
  try {
    const availability = await availabilityService.listAvailability();
    res.json({ data: availability });
  } catch (error) {
    next(error);
  }
}

export async function updateAvailability(req, res, next) {
  try {
    validateAvailabilityBody(req.body);

    const updatedAvailability = await availabilityService.saveAvailability(
      req.body.map((slot) => ({
        day_of_week: Number(slot.day_of_week),
        start_time: slot.start_time,
        end_time: slot.end_time
      }))
    );

    res.json({ data: updatedAvailability, message: "Availability updated successfully" });
  } catch (error) {
    next(error);
  }
}

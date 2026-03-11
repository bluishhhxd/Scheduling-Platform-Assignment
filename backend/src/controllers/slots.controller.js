import * as slotsService from "../services/slots.service.js";

function createError(message, statusCode = 400) {
  const error = new Error(message);
  error.statusCode = statusCode;
  return error;
}

function isValidDate(value) {
  return typeof value === "string" && /^\d{4}-\d{2}-\d{2}$/.test(value);
}

export async function getAvailableSlots(req, res, next) {
  try {
    const { eventSlug } = req.params;
    const { date } = req.query;

    if (!eventSlug) {
      throw createError("eventSlug is required");
    }

    if (!isValidDate(date)) {
      throw createError("date query parameter must use YYYY-MM-DD format");
    }

    const slots = await slotsService.generateAvailableSlots({ eventSlug, date });
    res.json({ data: slots });
  } catch (error) {
    next(error);
  }
}

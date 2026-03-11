import * as slotsService from "../services/slots.service.js";

export async function getAvailableSlots(req, res, next) {
  try {
    const slots = await slotsService.generateAvailableSlots(req.query);
    res.json(slots);
  } catch (error) {
    next(error);
  }
}

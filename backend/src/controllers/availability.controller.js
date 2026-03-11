import * as availabilityService from "../services/availability.service.js";

export async function getAvailability(req, res, next) {
  try {
    const availability = await availabilityService.listAvailability();
    res.json(availability);
  } catch (error) {
    next(error);
  }
}

export async function updateAvailability(req, res, next) {
  try {
    const updatedAvailability = await availabilityService.saveAvailability(req.body);
    res.json(updatedAvailability);
  } catch (error) {
    next(error);
  }
}

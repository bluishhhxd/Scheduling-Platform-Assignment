import { Router } from "express";
import { getAvailableSlots } from "../controllers/slots.controller.js";

const router = Router();

router.get("/:eventSlug", getAvailableSlots);

export default router;

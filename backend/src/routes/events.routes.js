import { Router } from "express";
import { createEventType, getEventBySlug, getEvents, removeEventType, updateEventType } from "../controllers/events.controller.js";

const router = Router();

router.get("/", getEvents);
router.post("/", createEventType);
router.put("/:id", updateEventType);
router.delete("/:id", removeEventType);
router.get("/:eventSlug", getEventBySlug);

export default router;

import { Router } from "express";
import { getEventBySlug, getEvents } from "../controllers/events.controller.js";

const router = Router();

router.get("/", getEvents);
router.get("/:eventSlug", getEventBySlug);

export default router;

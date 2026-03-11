import { Router } from "express";
import { createMeeting, getMeetings } from "../controllers/meetings.controller.js";

const router = Router();

router.get("/", getMeetings);
router.post("/", createMeeting);

export default router;

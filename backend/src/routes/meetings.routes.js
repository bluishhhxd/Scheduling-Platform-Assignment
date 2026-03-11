import { Router } from "express";
import { cancelMeeting, getMeetings } from "../controllers/meetings.controller.js";

const router = Router();

router.get("/", getMeetings);
router.delete("/:id", cancelMeeting);

export default router;

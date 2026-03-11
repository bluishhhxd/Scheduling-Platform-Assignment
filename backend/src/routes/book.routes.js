import { Router } from "express";
import { bookMeeting } from "../controllers/book.controller.js";

const router = Router();

router.post("/", bookMeeting);

export default router;

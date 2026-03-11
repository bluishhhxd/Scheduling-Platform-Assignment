import { Router } from "express";
import eventsRouter from "./events.routes.js";
import availabilityRouter from "./availability.routes.js";
import meetingsRouter from "./meetings.routes.js";
import slotsRouter from "./slots.routes.js";
import bookRouter from "./book.routes.js";

const router = Router();

router.use("/events", eventsRouter);
router.use("/availability", availabilityRouter);
router.use("/meetings", meetingsRouter);
router.use("/slots", slotsRouter);
router.use("/book", bookRouter);

export default router;

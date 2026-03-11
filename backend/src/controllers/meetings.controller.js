import * as meetingsService from "../services/meetings.service.js";

function createError(message, statusCode = 400) {
  const error = new Error(message);
  error.statusCode = statusCode;
  return error;
}

export async function getMeetings(req, res, next) {
  try {
    const meetings = await meetingsService.listMeetings();
    res.json({ data: meetings });
  } catch (error) {
    next(error);
  }
}

export async function cancelMeeting(req, res, next) {
  try {
    const id = Number(req.params.id);

    if (!Number.isInteger(id) || id <= 0) {
      throw createError("Invalid meeting id");
    }

    const meeting = await meetingsService.cancelMeeting(id);
    res.json({ data: meeting, message: "Meeting cancelled successfully" });
  } catch (error) {
    next(error);
  }
}

import * as meetingsService from "../services/meetings.service.js";

export async function getMeetings(req, res, next) {
  try {
    const meetings = await meetingsService.listMeetings();
    res.json(meetings);
  } catch (error) {
    next(error);
  }
}

export async function createMeeting(req, res, next) {
  try {
    const meeting = await meetingsService.createMeeting(req.body);
    res.status(201).json(meeting);
  } catch (error) {
    next(error);
  }
}

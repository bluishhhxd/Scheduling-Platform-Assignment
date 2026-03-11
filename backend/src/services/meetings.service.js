import { pool } from "../db/pool.js";

function createError(message, statusCode = 500) {
  const error = new Error(message);
  error.statusCode = statusCode;
  return error;
}

export async function listMeetings() {
  const query = `
    SELECT
      meetings.id,
      meetings.event_type_id,
      event_types.name AS event_name,
      event_types.slug AS event_slug,
      meetings.attendee_name,
      meetings.attendee_email,
      meetings.attendee_notes,
      meetings.start_time,
      meetings.end_time,
      meetings.status,
      meetings.created_at,
      meetings.updated_at
    FROM meetings
    INNER JOIN event_types ON event_types.id = meetings.event_type_id
    ORDER BY meetings.start_time ASC
  `;

  const { rows } = await pool.query(query);
  return rows;
}

export async function cancelMeeting(id) {
  const query = `
    UPDATE meetings
    SET status = 'cancelled', updated_at = NOW()
    WHERE id = $1 AND status <> 'cancelled'
    RETURNING id, event_type_id, attendee_name, attendee_email, attendee_notes, start_time, end_time, status, created_at, updated_at
  `;

  const { rows } = await pool.query(query, [id]);

  if (!rows[0]) {
    throw createError("Meeting not found", 404);
  }

  return rows[0];
}

export async function findConflictingMeeting(startTime, endTime) {
  const query = `
    SELECT id, start_time, end_time, status
    FROM meetings
    WHERE status <> 'cancelled'
      AND start_time < $2
      AND end_time > $1
    LIMIT 1
  `;

  const { rows } = await pool.query(query, [startTime, endTime]);
  return rows[0] || null;
}

export async function createBookedMeeting(payload) {
  const query = `
    INSERT INTO meetings (
      event_type_id,
      attendee_name,
      attendee_email,
      attendee_notes,
      start_time,
      end_time,
      status
    )
    VALUES ($1, $2, $3, $4, $5, $6, 'scheduled')
    RETURNING id, event_type_id, attendee_name, attendee_email, attendee_notes, start_time, end_time, status, created_at, updated_at
  `;

  const values = [
    payload.event_type_id,
    payload.attendee_name,
    payload.attendee_email,
    payload.attendee_notes || null,
    payload.start_time,
    payload.end_time
  ];

  const { rows } = await pool.query(query, values);
  return rows[0];
}

export async function getMeetingsForDate(date) {
  const query = `
    SELECT id, event_type_id, attendee_name, attendee_email, attendee_notes, start_time, end_time, status
    FROM meetings
    WHERE status <> 'cancelled'
      AND start_time::date = $1::date
    ORDER BY start_time ASC
  `;

  const { rows } = await pool.query(query, [date]);
  return rows;
}

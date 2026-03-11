import { pool } from "../db/pool.js";

function createError(message, statusCode = 500) {
  const error = new Error(message);
  error.statusCode = statusCode;
  return error;
}

export async function listAvailability() {
  const query = `
    SELECT id, day_of_week, start_time, end_time, created_at, updated_at
    FROM availability
    ORDER BY day_of_week ASC, start_time ASC
  `;

  const { rows } = await pool.query(query);
  return rows;
}

export async function saveAvailability(slots) {
  const client = await pool.connect();

  try {
    await client.query("BEGIN");
    await client.query("DELETE FROM availability");

    const insertedRows = [];
    const insertQuery = `
      INSERT INTO availability (day_of_week, start_time, end_time)
      VALUES ($1, $2, $3)
      RETURNING id, day_of_week, start_time, end_time, created_at, updated_at
    `;

    for (const slot of slots) {
      const { rows } = await client.query(insertQuery, [slot.day_of_week, slot.start_time, slot.end_time]);
      insertedRows.push(rows[0]);
    }

    await client.query("COMMIT");
    return insertedRows.sort((a, b) => a.day_of_week - b.day_of_week || String(a.start_time).localeCompare(String(b.start_time)));
  } catch (error) {
    await client.query("ROLLBACK");
    throw error;
  } finally {
    client.release();
  }
}

export async function getAvailabilityByDay(dayOfWeek) {
  const query = `
    SELECT id, day_of_week, start_time, end_time
    FROM availability
    WHERE day_of_week = $1
    ORDER BY start_time ASC
  `;

  const { rows } = await pool.query(query, [dayOfWeek]);
  return rows;
}

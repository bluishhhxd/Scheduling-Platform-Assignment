import { pool } from "../db/pool.js";

function createError(message, statusCode = 500) {
  const error = new Error(message);
  error.statusCode = statusCode;
  return error;
}

export async function listEventTypes() {
  const query = `
    SELECT id, name, slug, duration_minutes, description, location_type, is_active, created_at, updated_at
    FROM event_types
    WHERE is_active = TRUE
    ORDER BY created_at DESC, id DESC
  `;

  const { rows } = await pool.query(query);
  return rows;
}

export async function findEventTypeBySlug(eventSlug) {
  const query = `
    SELECT id, name, slug, duration_minutes, description, location_type, is_active, created_at, updated_at
    FROM event_types
    WHERE slug = $1 AND is_active = TRUE
    LIMIT 1
  `;

  const { rows } = await pool.query(query, [eventSlug]);
  return rows[0] || null;
}

export async function createEventType(payload) {
  const query = `
    INSERT INTO event_types (name, slug, duration_minutes, description)
    VALUES ($1, $2, $3, $4)
    RETURNING id, name, slug, duration_minutes, description, location_type, is_active, created_at, updated_at
  `;

  try {
    const values = [payload.name, payload.slug, payload.duration_minutes, payload.description || null];
    const { rows } = await pool.query(query, values);
    return rows[0];
  } catch (error) {
    if (error.code === "23505") {
      throw createError("An event type with this slug already exists", 409);
    }
    throw error;
  }
}

export async function updateEventType(id, payload) {
  const query = `
    UPDATE event_types
    SET
      name = $2,
      slug = $3,
      duration_minutes = $4,
      description = $5,
      updated_at = NOW()
    WHERE id = $1 AND is_active = TRUE
    RETURNING id, name, slug, duration_minutes, description, location_type, is_active, created_at, updated_at
  `;

  try {
    const values = [id, payload.name, payload.slug, payload.duration_minutes, payload.description || null];
    const { rows } = await pool.query(query, values);

    if (!rows[0]) {
      throw createError("Event type not found", 404);
    }

    return rows[0];
  } catch (error) {
    if (error.code === "23505") {
      throw createError("An event type with this slug already exists", 409);
    }
    throw error;
  }
}

export async function softDeleteEventType(id) {
  const query = `
    UPDATE event_types
    SET is_active = FALSE, updated_at = NOW()
    WHERE id = $1 AND is_active = TRUE
    RETURNING id, name, slug, duration_minutes, description, location_type, is_active, created_at, updated_at
  `;

  const { rows } = await pool.query(query, [id]);

  if (!rows[0]) {
    throw createError("Event type not found", 404);
  }

  return rows[0];
}

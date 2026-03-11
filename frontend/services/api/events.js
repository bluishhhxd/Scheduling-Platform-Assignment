import { apiRequest } from "@/services/api/client";

export function getEventTypes() {
  return apiRequest("/events");
}

export function getEventBySlug(eventSlug) {
  return apiRequest(`/events/${eventSlug}`);
}

export function createEventType(payload) {
  return apiRequest("/events", {
    method: "POST",
    body: JSON.stringify(payload)
  });
}

export function updateEventType(id, payload) {
  return apiRequest(`/events/${id}`, {
    method: "PUT",
    body: JSON.stringify(payload)
  });
}

export function deleteEventType(id) {
  return apiRequest(`/events/${id}`, {
    method: "DELETE"
  });
}

import { apiRequest } from "@/services/api/client";

export function getEventTypes() {
  return apiRequest("/events");
}

export function getEventBySlug(eventSlug) {
  return apiRequest(`/events/${eventSlug}`);
}

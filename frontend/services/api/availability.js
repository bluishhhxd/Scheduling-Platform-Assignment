import { apiRequest } from "@/services/api/client";

export function getAvailability() {
  return apiRequest("/availability");
}

export function updateAvailability(payload) {
  return apiRequest("/availability", {
    method: "PUT",
    body: JSON.stringify(payload)
  });
}

export function getAvailableSlots(eventSlug, date) {
  return apiRequest(`/slots/${eventSlug}?date=${date}`);
}

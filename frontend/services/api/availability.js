import { apiRequest } from "@/services/api/client";

export function getAvailability() {
  return apiRequest("/availability");
}

export function getAvailableSlots(eventSlug, date) {
  return apiRequest(`/slots?eventSlug=${eventSlug}&date=${date}`);
}

import { apiRequest } from "@/services/api/client";

export function getMeetings() {
  return apiRequest("/meetings");
}

export function createMeeting(payload) {
  return apiRequest("/meetings", {
    method: "POST",
    body: JSON.stringify(payload)
  });
}

export function bookMeeting(payload) {
  return apiRequest("/book", {
    method: "POST",
    body: JSON.stringify(payload)
  });
}

export function cancelMeeting(id) {
  return apiRequest(`/meetings/${id}`, {
    method: "DELETE"
  });
}

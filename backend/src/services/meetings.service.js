const mockMeetings = [
  {
    id: 1,
    event_type_id: 1,
    attendee_name: "Alex Johnson",
    attendee_email: "alex@example.com",
    start_time: "2026-03-14T10:00:00Z",
    end_time: "2026-03-14T10:30:00Z",
    status: "scheduled"
  }
];

export async function listMeetings() {
  return {
    data: mockMeetings,
    meta: {
      source: "placeholder-service"
    }
  };
}

export async function createMeeting(payload) {
  return {
    message: "Meeting creation not implemented yet",
    data: payload
  };
}

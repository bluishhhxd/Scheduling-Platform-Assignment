const mockAvailability = [
  { id: 1, day_of_week: 1, start_time: "09:00", end_time: "17:00" },
  { id: 2, day_of_week: 2, start_time: "09:00", end_time: "17:00" },
  { id: 3, day_of_week: 3, start_time: "10:00", end_time: "16:00" }
];

export async function listAvailability() {
  return {
    data: mockAvailability,
    meta: {
      source: "placeholder-service"
    }
  };
}

export async function saveAvailability(payload) {
  return {
    message: "Availability update not implemented yet",
    data: payload
  };
}

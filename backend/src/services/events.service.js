const mockEventTypes = [
  {
    id: 1,
    name: "30 Minute Intro",
    slug: "30-min-intro",
    duration_minutes: 30,
    description: "Placeholder event type response"
  },
  {
    id: 2,
    name: "45 Minute Demo",
    slug: "45-min-demo",
    duration_minutes: 45,
    description: "Placeholder event type response"
  }
];

export async function listEventTypes() {
  return {
    data: mockEventTypes,
    meta: {
      source: "placeholder-service"
    }
  };
}

export async function findEventTypeBySlug(eventSlug) {
  const event = mockEventTypes.find((item) => item.slug === eventSlug) || null;

  return {
    data: event,
    meta: {
      source: "placeholder-service"
    }
  };
}

INSERT INTO event_types (name, slug, description, duration_minutes, location_type, is_active)
VALUES
    ('30 Minute Intro', '30-min-intro', 'Introductory scheduling link for quick conversations.', 30, 'google_meet', TRUE),
    ('45 Minute Demo', '45-min-demo', 'Longer product walkthrough and demo session.', 45, 'zoom', TRUE),
    ('15 Minute Check-in', '15-min-check-in', 'Short follow-up booking type.', 15, 'phone', TRUE)
ON CONFLICT (slug) DO NOTHING;

INSERT INTO availability (day_of_week, start_time, end_time)
VALUES
    (1, '09:00', '17:00'),
    (2, '09:00', '17:00'),
    (3, '10:00', '16:00'),
    (4, '09:00', '17:00'),
    (5, '09:00', '15:00');

INSERT INTO meetings (event_type_id, attendee_name, attendee_email, attendee_notes, start_time, end_time, status)
VALUES
    (1, 'Alex Johnson', 'alex@example.com', 'Interested in product onboarding.', '2026-03-14 10:00:00', '2026-03-14 10:30:00', 'scheduled'),
    (2, 'Priya Sharma', 'priya@example.com', 'Requested a team demo.', '2026-03-15 14:30:00', '2026-03-15 15:15:00', 'scheduled');

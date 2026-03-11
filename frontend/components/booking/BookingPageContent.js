"use client";

import { useEffect, useMemo, useState } from "react";
import { getAvailableSlots } from "@/services/api/availability";
import { getEventBySlug } from "@/services/api/events";
import { bookMeeting } from "@/services/api/meetings";

function getToday() {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function formatDisplayTime(value) {
  if (!value) {
    return "";
  }

  const [hours, minutes] = value.split(":").map(Number);
  const suffix = hours >= 12 ? "PM" : "AM";
  const normalizedHours = hours % 12 || 12;

  return `${String(normalizedHours).padStart(2, "0")}:${String(minutes).padStart(2, "0")} ${suffix}`;
}

function formatDisplayDate(value) {
  if (!value) {
    return "No date selected";
  }

  const parsed = new Date(`${value}T00:00:00`);

  return parsed.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric"
  });
}

function buildStartTime(date, time) {
  return `${date}T${time}:00`;
}

export default function BookingPageContent({ eventSlug }) {
  const [eventDetails, setEventDetails] = useState(null);
  const [loadingEvent, setLoadingEvent] = useState(true);
  const [selectedDate, setSelectedDate] = useState("");
  const [slots, setSlots] = useState([]);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [loadingSlots, setLoadingSlots] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [confirmation, setConfirmation] = useState(null);
  const [formData, setFormData] = useState({ attendee_name: "", attendee_email: "" });

  useEffect(() => {
    let cancelled = false;

    async function loadEvent() {
      setLoadingEvent(true);
      setError("");

      try {
        const response = await getEventBySlug(eventSlug);
        if (!cancelled) {
          setEventDetails(response.data || null);
        }
      } catch (loadError) {
        if (!cancelled) {
          setError(loadError.message || "Unable to load event details.");
        }
      } finally {
        if (!cancelled) {
          setLoadingEvent(false);
        }
      }
    }

    loadEvent();

    return () => {
      cancelled = true;
    };
  }, [eventSlug]);

  useEffect(() => {
    if (!selectedDate) {
      setSlots([]);
      setSelectedSlot(null);
      setShowForm(false);
      setConfirmation(null);
      return;
    }

    let cancelled = false;

    async function loadSlots() {
      setLoadingSlots(true);
      setError("");
      setSelectedSlot(null);
      setShowForm(false);
      setConfirmation(null);

      try {
        const response = await getAvailableSlots(eventSlug, selectedDate);

        if (!cancelled) {
          setSlots(response.data?.slots || []);
        }
      } catch (fetchError) {
        if (!cancelled) {
          setSlots([]);
          setError(fetchError.message || "Unable to load available slots right now.");
        }
      } finally {
        if (!cancelled) {
          setLoadingSlots(false);
        }
      }
    }

    loadSlots();

    return () => {
      cancelled = true;
    };
  }, [eventSlug, selectedDate]);

  const selectedSlotLabel = useMemo(() => {
    return selectedSlot ? formatDisplayTime(selectedSlot.time) : "No time selected";
  }, [selectedSlot]);

  async function handleSubmit(event) {
    event.preventDefault();

    if (!selectedSlot || !formData.attendee_name.trim() || !formData.attendee_email.trim()) {
      setError("Please choose a slot and fill in your details.");
      return;
    }

    setSubmitting(true);
    setError("");

    const startTime = buildStartTime(selectedDate, selectedSlot.time);

    try {
      const response = await bookMeeting({
        eventSlug,
        attendeeName: formData.attendee_name.trim(),
        attendeeEmail: formData.attendee_email.trim(),
        startTime
      });

      setConfirmation({
        eventName: response.data?.event?.name || eventDetails?.name || eventSlug,
        date: selectedDate,
        time: selectedSlot.time,
        attendeeName: formData.attendee_name.trim()
      });
      setShowForm(false);
    } catch (submitError) {
      setError(submitError.message || "Unable to complete your booking right now.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <main className="min-h-screen bg-[var(--background)] px-4 py-10">
      <div className="mx-auto grid max-w-5xl gap-6 lg:grid-cols-[1.1fr_1fr]">
        <section className="rounded-[32px] border border-[var(--border)] bg-white p-8 shadow-[0_18px_40px_rgba(15,23,42,0.08)]">
          <p className="text-sm font-medium uppercase tracking-[0.18em] text-[var(--text-soft)]">Public Booking Page</p>
          <h1 className="mt-4 text-4xl font-semibold">{loadingEvent ? `Book ${eventSlug}` : eventDetails?.name || eventSlug}</h1>
          <p className="mt-4 max-w-xl text-sm leading-6 text-[var(--text-soft)]">
            {eventDetails?.description || "Select a date, choose an available slot, and continue to enter your contact details."}
          </p>

          <div className="mt-8 grid gap-4 rounded-3xl border border-[var(--border)] bg-[var(--surface-muted)] p-5 md:grid-cols-2">
            <div className="rounded-2xl bg-white p-4">
              <p className="text-sm font-medium">Event Duration</p>
              <p className="mt-1 text-sm text-[var(--text-soft)]">
                {eventDetails?.duration_minutes ? `${eventDetails.duration_minutes} minutes` : "Loading..."}
              </p>
            </div>
            <div className="rounded-2xl bg-white p-4">
              <p className="text-sm font-medium">Booking Slug</p>
              <p className="mt-1 text-sm text-[var(--text-soft)]">{eventSlug}</p>
            </div>
            <div className="md:col-span-2">
              <label htmlFor="booking-date" className="text-sm font-medium text-[var(--text)]">
                Choose a date
              </label>
              <input
                id="booking-date"
                type="date"
                min={getToday()}
                value={selectedDate}
                onChange={(event) => setSelectedDate(event.target.value)}
                className="mt-3 w-full rounded-2xl border border-[var(--border)] bg-white px-4 py-3 text-sm outline-none"
              />
              <p className="mt-3 text-sm text-[var(--text-soft)]">{formatDisplayDate(selectedDate)}</p>
            </div>
          </div>
        </section>

        <section className="rounded-[32px] border border-[var(--border)] bg-[var(--surface-muted)] p-8">
          <h2 className="text-xl font-semibold">Booking Details</h2>
          <div className="mt-6 space-y-4">
            <div className="rounded-2xl bg-white p-4">
              <p className="text-sm font-medium">Selected Event</p>
              <p className="mt-1 text-sm text-[var(--text-soft)]">{confirmation?.eventName || eventDetails?.name || eventSlug}</p>
            </div>

            <div className="rounded-2xl bg-white p-4">
              <p className="text-sm font-medium">Available Slots</p>

              {!selectedDate ? (
                <p className="mt-2 text-sm text-[var(--text-soft)]">Choose a date to load available times.</p>
              ) : null}

              {loadingSlots ? <p className="mt-2 text-sm text-[var(--text-soft)]">Loading slots...</p> : null}
              {error ? <p className="mt-2 text-sm text-red-600">{error}</p> : null}

              {!loadingSlots && selectedDate && !error && !confirmation ? (
                <div className="mt-4 flex flex-wrap gap-3">
                  {slots.length > 0 ? (
                    slots.map((slot) => (
                      <button
                        key={slot.start_time}
                        type="button"
                        onClick={() => setSelectedSlot(slot)}
                        className={`rounded-full border px-4 py-2 text-sm font-medium transition ${
                          selectedSlot?.start_time === slot.start_time
                            ? "border-[var(--primary)] bg-[var(--primary)] text-white"
                            : "border-[var(--border)] bg-white text-[var(--text)]"
                        }`}
                      >
                        {formatDisplayTime(slot.time)}
                      </button>
                    ))
                  ) : (
                    <p className="text-sm text-[var(--text-soft)]">No available slots for this date.</p>
                  )}
                </div>
              ) : null}
            </div>

            <div className="rounded-2xl bg-white p-4">
              <p className="text-sm font-medium">Selected Time</p>
              <p className="mt-1 text-sm text-[var(--text-soft)]">
                {confirmation ? formatDisplayTime(confirmation.time) : selectedSlotLabel}
              </p>
            </div>

            {confirmation ? (
              <div className="rounded-2xl bg-white p-5">
                <h3 className="text-lg font-semibold">Your meeting has been scheduled successfully.</h3>
                <div className="mt-4 space-y-2 text-sm text-[var(--text-soft)]">
                  <p><span className="font-medium text-[var(--text)]">Event:</span> {confirmation.eventName}</p>
                  <p><span className="font-medium text-[var(--text)]">Date:</span> {formatDisplayDate(confirmation.date)}</p>
                  <p><span className="font-medium text-[var(--text)]">Time:</span> {formatDisplayTime(confirmation.time)}</p>
                  <p><span className="font-medium text-[var(--text)]">Attendee:</span> {confirmation.attendeeName}</p>
                </div>
              </div>
            ) : showForm ? (
              <form onSubmit={handleSubmit} className="space-y-4 rounded-2xl bg-white p-5">
                <div>
                  <label htmlFor="attendee_name" className="text-sm font-medium text-[var(--text)]">Attendee Name</label>
                  <input
                    id="attendee_name"
                    type="text"
                    value={formData.attendee_name}
                    onChange={(event) => setFormData((current) => ({ ...current, attendee_name: event.target.value }))}
                    className="mt-2 w-full rounded-2xl border border-[var(--border)] px-4 py-3 text-sm outline-none"
                    placeholder="Jane Doe"
                  />
                </div>

                <div>
                  <label htmlFor="attendee_email" className="text-sm font-medium text-[var(--text)]">Attendee Email</label>
                  <input
                    id="attendee_email"
                    type="email"
                    value={formData.attendee_email}
                    onChange={(event) => setFormData((current) => ({ ...current, attendee_email: event.target.value }))}
                    className="mt-2 w-full rounded-2xl border border-[var(--border)] px-4 py-3 text-sm outline-none"
                    placeholder="jane@example.com"
                  />
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className={`w-full rounded-full px-4 py-3 text-sm font-semibold text-white ${
                    submitting ? "cursor-wait bg-slate-400" : "bg-[var(--primary)]"
                  }`}
                >
                  {submitting ? "Scheduling..." : "Confirm Booking"}
                </button>
              </form>
            ) : (
              <button
                type="button"
                onClick={() => {
                  setShowForm(true);
                  setError("");
                }}
                disabled={!selectedSlot || loadingEvent || !eventDetails}
                className={`w-full rounded-full px-4 py-3 text-sm font-semibold text-white ${
                  selectedSlot && eventDetails ? "bg-[var(--primary)]" : "cursor-not-allowed bg-slate-300"
                }`}
              >
                Continue
              </button>
            )}
          </div>
        </section>
      </div>
    </main>
  );
}

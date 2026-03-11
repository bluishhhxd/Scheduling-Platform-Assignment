"use client";

import { useEffect, useMemo, useState } from "react";
import PageHeader from "@/components/common/PageHeader";
import MeetingList from "@/components/meetings/MeetingList";
import StatCard from "@/components/common/StatCard";
import { cancelMeeting, getMeetings } from "@/services/api/meetings";

export default function MeetingsPage() {
  const [meetings, setMeetings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cancellingId, setCancellingId] = useState(null);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    loadMeetings();
  }, []);

  async function loadMeetings() {
    setLoading(true);
    setError("");

    try {
      const response = await getMeetings();
      setMeetings(response.data || []);
    } catch (loadError) {
      setError(loadError.message || "Unable to load meetings.");
    } finally {
      setLoading(false);
    }
  }

  async function handleCancel(id) {
    setCancellingId(id);
    setError("");
    setMessage("");

    try {
      const response = await cancelMeeting(id);
      setMeetings((current) =>
        current.map((meeting) => (meeting.id === id ? { ...meeting, ...response.data } : meeting))
      );
      setMessage("Meeting cancelled successfully.");
    } catch (cancelError) {
      setError(cancelError.message || "Unable to cancel meeting.");
    } finally {
      setCancellingId(null);
    }
  }

  const now = new Date();
  const upcomingMeetings = useMemo(
    () => meetings.filter((meeting) => new Date(meeting.start_time) >= now),
    [meetings, now]
  );
  const pastMeetings = useMemo(
    () => meetings.filter((meeting) => new Date(meeting.start_time) < now),
    [meetings, now]
  );

  return (
    <div className="space-y-8">
      <PageHeader
        title="Meetings"
        description="Review upcoming and past bookings, and cancel future meetings when plans change."
      />

      <section className="grid gap-4 md:grid-cols-3">
        <StatCard label="Upcoming meetings" value={String(upcomingMeetings.length)} helper="Future bookings from public links" />
        <StatCard label="Past meetings" value={String(pastMeetings.length)} helper="Completed booking history" />
        <StatCard label="Total meetings" value={String(meetings.length)} helper="Includes cancelled meetings" />
      </section>

      {message ? <p className="text-sm text-emerald-700">{message}</p> : null}
      {error ? <p className="text-sm text-rose-700">{error}</p> : null}

      {loading ? (
        <section className="rounded-3xl border border-[var(--border)] bg-[var(--surface-muted)] p-6 text-sm text-[var(--text-soft)]">
          Loading meetings...
        </section>
      ) : (
        <MeetingList
          upcomingMeetings={upcomingMeetings}
          pastMeetings={pastMeetings}
          onCancel={handleCancel}
          cancellingId={cancellingId}
        />
      )}
    </div>
  );
}

"use client";

import { useEffect, useMemo, useState } from "react";
import PageHeader from "@/components/common/PageHeader";
import AvailabilityOverview from "@/components/availability/AvailabilityOverview";
import { getAvailability, updateAvailability } from "@/services/api/availability";

const defaultDays = [0, 1, 2, 3, 4, 5, 6].map((day) => ({
  day_of_week: day,
  start_time: day === 0 || day === 6 ? "" : "09:00",
  end_time: day === 0 || day === 6 ? "" : "17:00"
}));

function mapAvailability(rows) {
  return defaultDays.map((day) => {
    const found = rows.find((slot) => Number(slot.day_of_week) === day.day_of_week);

    return {
      day_of_week: day.day_of_week,
      start_time: found ? String(found.start_time).slice(0, 5) : day.start_time,
      end_time: found ? String(found.end_time).slice(0, 5) : day.end_time
    };
  });
}

export default function AvailabilityPage() {
  const [availability, setAvailability] = useState(defaultDays);
  const [draftAvailability, setDraftAvailability] = useState(defaultDays);
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    loadAvailability();
  }, []);

  async function loadAvailability() {
    setLoading(true);
    setError("");

    try {
      const response = await getAvailability();
      const mapped = mapAvailability(response.data || []);
      setAvailability(mapped);
      setDraftAvailability(mapped);
    } catch (loadError) {
      setError(loadError.message || "Unable to load availability.");
    } finally {
      setLoading(false);
    }
  }

  function handleChange(dayOfWeek, field, value) {
    setDraftAvailability((current) =>
      current.map((slot) => (slot.day_of_week === dayOfWeek ? { ...slot, [field]: value } : slot))
    );
  }

  function handleToggleEdit() {
    setError("");
    setMessage("");
    if (isEditing) {
      setDraftAvailability(availability);
    }
    setIsEditing((current) => !current);
  }

  async function handleSave() {
    setIsSaving(true);
    setError("");
    setMessage("");

    const payload = draftAvailability
      .filter((slot) => slot.start_time && slot.end_time)
      .map((slot) => ({
        day_of_week: slot.day_of_week,
        start_time: slot.start_time,
        end_time: slot.end_time
      }));

    try {
      const response = await updateAvailability(payload);
      const mapped = mapAvailability(response.data || []);
      setAvailability(mapped);
      setDraftAvailability(mapped);
      setIsEditing(false);
      setMessage("Availability updated successfully.");
    } catch (saveError) {
      setError(saveError.message || "Unable to save availability.");
    } finally {
      setIsSaving(false);
    }
  }

  const configuredDays = useMemo(
    () => availability.filter((slot) => slot.start_time && slot.end_time).length,
    [availability]
  );

  return (
    <div className="space-y-8">
      <PageHeader
        title="Availability"
        description="Set the hours when meetings can be booked across your weekly schedule."
      />

      <section className="grid gap-4 md:grid-cols-3">
        <div className="rounded-3xl border border-[var(--border)] bg-white p-5">
          <p className="text-sm text-[var(--text-soft)]">Configured days</p>
          <p className="mt-3 text-3xl font-semibold">{configuredDays}</p>
        </div>
        <div className="rounded-3xl border border-[var(--border)] bg-white p-5">
          <p className="text-sm text-[var(--text-soft)]">Timezone</p>
          <p className="mt-3 text-3xl font-semibold">Local</p>
          <p className="mt-2 text-sm text-[var(--text-soft)]">Using the browser and server local time in this version.</p>
        </div>
        <div className="rounded-3xl border border-[var(--border)] bg-white p-5">
          <p className="text-sm text-[var(--text-soft)]">Editing</p>
          <p className="mt-3 text-3xl font-semibold">{isEditing ? "On" : "Off"}</p>
        </div>
      </section>

      {loading ? (
        <section className="rounded-3xl border border-[var(--border)] bg-[var(--surface-muted)] p-6 text-sm text-[var(--text-soft)]">
          Loading availability...
        </section>
      ) : (
        <AvailabilityOverview
          availability={isEditing ? draftAvailability : availability}
          isEditing={isEditing}
          onChange={handleChange}
          onSave={handleSave}
          onToggleEdit={handleToggleEdit}
          isSaving={isSaving}
          helperMessage={message || error}
        />
      )}
    </div>
  );
}

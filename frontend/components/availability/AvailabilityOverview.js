"use client";

const dayLabels = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
];

function formatHours(startTime, endTime) {
  if (!startTime || !endTime) {
    return "Unavailable";
  }

  return `${startTime} - ${endTime}`;
}

export default function AvailabilityOverview({
  availability,
  isEditing,
  onChange,
  onSave,
  onToggleEdit,
  isSaving,
  helperMessage
}) {
  return (
    <section className="rounded-3xl border border-[var(--border)] bg-[var(--surface-muted)] p-4">
      <div className="flex flex-col gap-4 border-b border-[var(--border)] pb-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h3 className="text-lg font-semibold">Weekly Hours</h3>
          <p className="mt-1 text-sm text-[var(--text-soft)]">Set the booking hours for each day of the week.</p>
        </div>
        <div className="flex gap-3">
          <button
            type="button"
            onClick={onToggleEdit}
            className="rounded-full border border-[var(--border)] bg-white px-4 py-2 text-sm font-medium"
          >
            {isEditing ? "Cancel" : "Edit Availability"}
          </button>
          {isEditing ? (
            <button
              type="button"
              onClick={onSave}
              disabled={isSaving}
              className={`rounded-full px-4 py-2 text-sm font-medium text-white ${
                isSaving ? "cursor-not-allowed bg-slate-400" : "bg-[var(--primary)]"
              }`}
            >
              {isSaving ? "Saving..." : "Save Changes"}
            </button>
          ) : null}
        </div>
      </div>

      {helperMessage ? <p className="mt-4 text-sm text-[var(--text-soft)]">{helperMessage}</p> : null}

      <div className="mt-4 space-y-3">
        {availability.map((slot) => (
          <div
            key={slot.day_of_week}
            className="flex flex-col gap-3 rounded-2xl border border-[var(--border)] bg-white px-4 py-4 md:flex-row md:items-center md:justify-between"
          >
            <span className="font-medium">{dayLabels[slot.day_of_week]}</span>
            {isEditing ? (
              <div className="flex flex-col gap-3 md:flex-row md:items-center">
                <input
                  type="time"
                  value={slot.start_time}
                  onChange={(event) => onChange(slot.day_of_week, "start_time", event.target.value)}
                  className="rounded-2xl border border-[var(--border)] px-4 py-2 text-sm"
                />
                <span className="text-sm text-[var(--text-soft)]">to</span>
                <input
                  type="time"
                  value={slot.end_time}
                  onChange={(event) => onChange(slot.day_of_week, "end_time", event.target.value)}
                  className="rounded-2xl border border-[var(--border)] px-4 py-2 text-sm"
                />
              </div>
            ) : (
              <span className="text-sm text-[var(--text-soft)]">{formatHours(slot.start_time, slot.end_time)}</span>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}

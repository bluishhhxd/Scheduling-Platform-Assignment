"use client";

function formatDateTime(value) {
  const parsed = new Date(value);

  if (Number.isNaN(parsed.getTime())) {
    return value;
  }

  return parsed.toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit"
  });
}

function Section({ title, meetings, emptyMessage, onCancel, cancellingId }) {
  return (
    <section className="overflow-hidden rounded-3xl border border-[var(--border)]">
      <div className="border-b border-[var(--border)] bg-[var(--surface-muted)] px-5 py-4">
        <h3 className="text-lg font-semibold">{title}</h3>
      </div>
      <div className="divide-y divide-[var(--border)] bg-white">
        {meetings.length ? (
          meetings.map((meeting) => {
            const canCancel = meeting.status === "scheduled" && new Date(meeting.start_time) >= new Date();

            return (
              <article
                key={meeting.id}
                className="flex flex-col gap-4 px-5 py-4 lg:flex-row lg:items-center lg:justify-between"
              >
                <div>
                  <h4 className="font-semibold">{meeting.event_name}</h4>
                  <p className="mt-1 text-sm text-[var(--text-soft)]">{meeting.attendee_name} | {meeting.attendee_email}</p>
                </div>
                <div className="text-sm text-[var(--text-soft)]">{formatDateTime(meeting.start_time)}</div>
                <div className="flex items-center gap-3">
                  <span className={`rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wide ${
                    meeting.status === "cancelled"
                      ? "bg-rose-50 text-rose-700"
                      : new Date(meeting.start_time) < new Date()
                        ? "bg-slate-100 text-slate-700"
                        : "bg-sky-50 text-sky-700"
                  }`}>
                    {meeting.status}
                  </span>
                  {canCancel ? (
                    <button
                      type="button"
                      onClick={() => onCancel(meeting.id)}
                      disabled={cancellingId === meeting.id}
                      className={`rounded-full px-4 py-2 text-sm font-medium text-white ${
                        cancellingId === meeting.id ? "cursor-not-allowed bg-slate-400" : "bg-[#d64545]"
                      }`}
                    >
                      {cancellingId === meeting.id ? "Cancelling..." : "Cancel"}
                    </button>
                  ) : null}
                </div>
              </article>
            );
          })
        ) : (
          <div className="px-5 py-6 text-sm text-[var(--text-soft)]">{emptyMessage}</div>
        )}
      </div>
    </section>
  );
}

export default function MeetingList({ upcomingMeetings, pastMeetings, onCancel, cancellingId }) {
  return (
    <div className="space-y-6">
      <Section
        title="Upcoming Meetings"
        meetings={upcomingMeetings}
        emptyMessage="No upcoming meetings scheduled yet."
        onCancel={onCancel}
        cancellingId={cancellingId}
      />
      <Section
        title="Past Meetings"
        meetings={pastMeetings}
        emptyMessage="No past meetings yet."
        onCancel={onCancel}
        cancellingId={cancellingId}
      />
    </div>
  );
}

export default function MeetingList({ meetings }) {
  return (
    <section className="overflow-hidden rounded-3xl border border-[var(--border)]">
      <div className="border-b border-[var(--border)] bg-[var(--surface-muted)] px-5 py-4">
        <h3 className="text-lg font-semibold">Upcoming Meetings</h3>
      </div>
      <div className="divide-y divide-[var(--border)] bg-white">
        {meetings.map((meeting) => (
          <article key={meeting.id} className="flex flex-col gap-3 px-5 py-4 md:flex-row md:items-center md:justify-between">
            <div>
              <h4 className="font-semibold">{meeting.title}</h4>
              <p className="mt-1 text-sm text-[var(--text-soft)]">{meeting.attendee}</p>
            </div>
            <div className="text-sm text-[var(--text-soft)]">{meeting.startTime}</div>
            <span className="rounded-full bg-sky-50 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-sky-700">
              {meeting.status}
            </span>
          </article>
        ))}
      </div>
    </section>
  );
}

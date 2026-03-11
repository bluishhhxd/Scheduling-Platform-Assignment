export default function AvailabilityOverview({ availability }) {
  return (
    <section className="rounded-3xl border border-[var(--border)] bg-[var(--surface-muted)] p-4">
      <h3 className="text-lg font-semibold">Weekly Hours</h3>
      <div className="mt-4 space-y-3">
        {availability.map((slot) => (
          <div
            key={slot.day}
            className="flex flex-col justify-between rounded-2xl border border-[var(--border)] bg-white px-4 py-4 md:flex-row md:items-center"
          >
            <span className="font-medium">{slot.day}</span>
            <span className="text-sm text-[var(--text-soft)]">{slot.hours}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

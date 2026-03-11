import Link from "next/link";

export default function EventTypeList({ eventTypes }) {
  return (
    <section className="rounded-3xl border border-[var(--border)] bg-[var(--surface-muted)] p-4">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-lg font-semibold">Your Event Types</h3>
        <span className="text-sm text-[var(--text-soft)]">{eventTypes.length} items</span>
      </div>

      <div className="space-y-3">
        {eventTypes.map((eventType) => (
          <article
            key={eventType.id}
            className="rounded-3xl border border-[var(--border)] bg-white p-5 shadow-sm"
          >
            <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
              <div>
                <h4 className="text-lg font-semibold">{eventType.name}</h4>
                <p className="mt-1 text-sm text-[var(--text-soft)]">
                  {eventType.duration} min · Slug: {eventType.slug}
                </p>
              </div>
              <div className="flex items-center gap-3">
                <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-emerald-700">
                  {eventType.active ? "Active" : "Draft"}
                </span>
                <Link
                  href={`/book/${eventType.slug}`}
                  className="rounded-full border border-[var(--border)] px-4 py-2 text-sm font-medium"
                >
                  View Booking Page
                </Link>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

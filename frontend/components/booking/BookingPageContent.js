export default function BookingPageContent({ eventSlug }) {
  return (
    <main className="min-h-screen bg-[var(--background)] px-4 py-10">
      <div className="mx-auto grid max-w-5xl gap-6 lg:grid-cols-[1.1fr_1fr]">
        <section className="rounded-[32px] border border-[var(--border)] bg-white p-8 shadow-[0_18px_40px_rgba(15,23,42,0.08)]">
          <p className="text-sm font-medium uppercase tracking-[0.18em] text-[var(--text-soft)]">Public Booking Page</p>
          <h1 className="mt-4 text-4xl font-semibold">Book {eventSlug}</h1>
          <p className="mt-4 max-w-xl text-sm leading-6 text-[var(--text-soft)]">
            This route is scaffolded at <code>/book/[eventSlug]</code>. Real event details, calendar selection,
            and slot booking will be connected later through backend APIs.
          </p>
        </section>

        <section className="rounded-[32px] border border-[var(--border)] bg-[var(--surface-muted)] p-8">
          <h2 className="text-xl font-semibold">Booking Panel Placeholder</h2>
          <div className="mt-6 space-y-4">
            <div className="rounded-2xl bg-white p-4">
              <p className="text-sm font-medium">Selected Event</p>
              <p className="mt-1 text-sm text-[var(--text-soft)]">{eventSlug}</p>
            </div>
            <div className="rounded-2xl bg-white p-4">
              <p className="text-sm font-medium">Available Slots</p>
              <p className="mt-1 text-sm text-[var(--text-soft)]">Slot generation API will populate this section.</p>
            </div>
            <button
              type="button"
              className="w-full rounded-full bg-[var(--primary)] px-4 py-3 text-sm font-semibold text-white"
            >
              Continue
            </button>
          </div>
        </section>
      </div>
    </main>
  );
}

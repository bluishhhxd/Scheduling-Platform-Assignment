"use client";

import Link from "next/link";

export default function EventTypeList({
  eventTypes,
  onEdit,
  onDelete,
  deletingId,
  publicBaseUrl
}) {
  if (!eventTypes.length) {
    return (
      <section className="rounded-3xl border border-[var(--border)] bg-[var(--surface-muted)] p-6">
        <p className="text-sm text-[var(--text-soft)]">No event types yet. Create your first booking link to get started.</p>
      </section>
    );
  }

  return (
    <section className="rounded-3xl border border-[var(--border)] bg-[var(--surface-muted)] p-4">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-lg font-semibold">Your Event Types</h3>
        <span className="text-sm text-[var(--text-soft)]">{eventTypes.length} items</span>
      </div>

      <div className="space-y-3">
        {eventTypes.map((eventType) => {
          const publicLink = `${publicBaseUrl}/book/${eventType.slug}`;

          return (
            <article
              key={eventType.id}
              className="rounded-3xl border border-[var(--border)] bg-white p-5 shadow-sm"
            >
              <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
                <div className="space-y-2">
                  <div className="flex items-center gap-3">
                    <h4 className="text-lg font-semibold">{eventType.name}</h4>
                    <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-emerald-700">
                      {eventType.is_active ? "Active" : "Draft"}
                    </span>
                  </div>
                  <p className="text-sm text-[var(--text-soft)]">
                    {eventType.duration_minutes} min | Slug: {eventType.slug}
                  </p>
                  <p className="text-sm text-[var(--text-soft)]">
                    {eventType.description || "No description added yet."}
                  </p>
                  <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface-muted)] px-4 py-3 text-sm text-[var(--text-soft)]">
                    <span className="font-medium text-[var(--text)]">Public link:</span> {publicLink}
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-3">
                  <Link
                    href={`/book/${eventType.slug}`}
                    className="rounded-full border border-[var(--border)] px-4 py-2 text-sm font-medium"
                  >
                    Open Booking Page
                  </Link>
                  <button
                    type="button"
                    onClick={() => onEdit(eventType)}
                    className="rounded-full border border-[var(--border)] px-4 py-2 text-sm font-medium"
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    onClick={() => onDelete(eventType.id)}
                    disabled={deletingId === eventType.id}
                    className={`rounded-full px-4 py-2 text-sm font-medium text-white ${
                      deletingId === eventType.id ? "cursor-not-allowed bg-slate-400" : "bg-[#d64545]"
                    }`}
                  >
                    {deletingId === eventType.id ? "Deleting..." : "Delete"}
                  </button>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}

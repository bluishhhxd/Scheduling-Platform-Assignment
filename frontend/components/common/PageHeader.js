export default function PageHeader({ title, description, actionLabel }) {
  return (
    <div className="flex flex-col gap-4 border-b border-[var(--border)] pb-6 md:flex-row md:items-center md:justify-between">
      <div>
        <h2 className="text-3xl font-semibold tracking-tight">{title}</h2>
        <p className="mt-2 max-w-2xl text-sm text-[var(--text-soft)]">{description}</p>
      </div>
      {actionLabel ? (
        <button
          type="button"
          className="rounded-full bg-[var(--primary)] px-5 py-3 text-sm font-semibold text-white shadow-[0_10px_30px_rgba(0,107,255,0.25)]"
        >
          {actionLabel}
        </button>
      ) : null}
    </div>
  );
}

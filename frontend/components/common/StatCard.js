export default function StatCard({ label, value, helper }) {
  return (
    <div className="rounded-3xl border border-[var(--border)] bg-[var(--surface)] p-5">
      <p className="text-sm text-[var(--text-soft)]">{label}</p>
      <p className="mt-3 text-3xl font-semibold">{value}</p>
      <p className="mt-2 text-sm text-[var(--text-soft)]">{helper}</p>
    </div>
  );
}

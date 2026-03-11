export default function Topbar() {
  return (
    <header className="border-b border-[var(--border)] bg-white/80 px-6 py-4 backdrop-blur md:px-8">
      <div className="mx-auto flex max-w-6xl items-center justify-between">
        <div>
          <p className="text-sm font-medium text-[var(--text)]">Dashboard</p>
          <p className="text-sm text-[var(--text-soft)]">Calendly-inspired scheduling workspace scaffold</p>
        </div>
        <div className="rounded-full bg-[var(--primary-soft)] px-4 py-2 text-sm font-medium text-[var(--primary)]">
          Logged in as Demo User
        </div>
      </div>
    </header>
  );
}

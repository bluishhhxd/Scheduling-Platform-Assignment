import Sidebar from "@/components/layout/Sidebar";
import Topbar from "@/components/layout/Topbar";

export default function DashboardShell({ children }) {
  return (
    <div className="flex min-h-screen bg-[var(--background)] text-[var(--text)]">
      <Sidebar />
      <div className="flex min-h-screen flex-1 flex-col">
        <Topbar />
        <main className="flex-1 p-6 md:p-8">
          <div className="mx-auto w-full max-w-6xl rounded-[28px] border border-[var(--border)] bg-[var(--surface)] p-6 shadow-[0_20px_60px_rgba(15,23,42,0.08)] md:p-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}

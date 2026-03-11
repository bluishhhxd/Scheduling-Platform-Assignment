"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navigation = [
  { href: "/event-types", label: "Event Types" },
  { href: "/availability", label: "Availability" },
  { href: "/meetings", label: "Meetings" }
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden w-72 flex-col border-r border-[var(--border)] bg-[#0b1726] px-5 py-6 text-white md:flex">
      <div className="mb-8">
        <p className="text-xs uppercase tracking-[0.28em] text-slate-400">Scheduling</p>
        <h1 className="mt-2 text-2xl font-semibold">Calendar Hub</h1>
      </div>

      <nav className="space-y-2">
        {navigation.map((item) => {
          const active = pathname === item.href;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={lock rounded-2xl px-4 py-3 text-sm transition }
            >
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="mt-auto rounded-3xl bg-slate-900/80 p-4">
        <p className="text-sm font-medium">Default User</p>
        <p className="mt-1 text-sm text-slate-400">No authentication in this scaffold.</p>
      </div>
    </aside>
  );
}

"use client";

import Link from "next/link";
import { usePathname} from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import Logo from "../../../public/images/GC-logo.png"

const MENU = [
  { label: "Portfolio", href: "/", icon: "📊" },
  { label: "Analytics", href: "/analytics", icon: "📈" },
  { label: "Controls", href: "/controls", icon: "⚙️" },
  { label: "AI Insights", href: "/ai-insights", icon: "🧠" },
];

export default function ResponsiveLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-slate-900 text-slate-100">
      <MobileTopBar />
      <div className="mx-auto max-w-[1600px] grid grid-cols-1 md:grid-cols-[260px_1fr]">
        <DesktopSidebar />
        <main className="min-h-screen bg-slate-100 text-slate-900">
          <div className="p-4 md:p-8">{children}</div>
        </main>
      </div>
    </div>
  );
}

/* Mobile Top Bar + Dropdown   */
function MobileTopBar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const menuRef = useRef<HTMLDivElement | null>(null);
  const btnRef = useRef<HTMLButtonElement | null>(null);

  // Close when route changes
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // Close on outside click
  useEffect(() => {
    function onDocClick(e: MouseEvent) {
      if (!open) return;
      const t = e.target as Node;
      if (menuRef.current?.contains(t)) return;
      if (btnRef.current?.contains(t)) return;
      setOpen(false);
    }
    document.addEventListener("mousedown", onDocClick);
    return () => document.removeEventListener("mousedown", onDocClick);
  }, [open]);

  // Close on Escape
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  // Prevent page scroll when mobile menu is open
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = prev; };
  }, [open]);


  return (
    <header className="md:hidden sticky top-0 z-40 bg-slate-900/90 border-b border-slate-800">
      <div className="flex items-center justify-between px-4 h-14">
        <Link href="/" className="text-lg font-semibold tracking-tight">
            <Image
              src={Logo}
              alt={"GreenConnect Logo"}
              width={160}     // adjust size
              height={40}     // adjust size
              className="object-contain"
            />
        </Link>

        <button
          ref={btnRef}
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label="Open menu"
          onClick={() => setOpen((s) => !s)}
          className="p-2 rounded-xl hover:bg-slate-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-300"
        >
          <div className="w-5 h-4 relative" aria-hidden>
            <span
              className={`absolute left-0 top-0 block h-0.5 w-5 bg-slate-200 transition-transform ${
                open ? "translate-y-2 rotate-45" : ""
              }`}
            />
            <span
              className={`absolute left-0 top-2 block h-0.5 w-5 bg-slate-200 transition-opacity ${
                open ? "opacity-0" : "opacity-100"
              }`}
            />
            <span
              className={`absolute left-0 bottom-0 block h-0.5 w-5 bg-slate-200 transition-transform ${
                open ? "-translate-y-2 -rotate-45" : ""
              }`}
            />
          </div>
        </button>
      </div>

      {open && (
    <div className="fixed inset-0 z-50 md:hidden" role="dialog" aria-modal="true">
      {/* Backdrop (tap to close) */}
      <div
        className="absolute inset-0 bg-black/40"
        onClick={() => setOpen(false)}
      />

      <div
        id="mobile-menu"
        ref={menuRef}
        className="absolute left-0 right-0 top-14 mx-2 border border-slate-800 bg-slate-900 shadow-xl"
      >
        <nav className="flex flex-col gap-1 py-2">
          {MENU.map((m) => {
            const active = pathname === m.href;
            const baseClasses =
              "flex items-center gap-2 rounded-xl px-3 py-2 hover:bg-slate-800 active:bg-slate-700 " +
              (active ? "bg-slate-800 text-white" : "text-slate-200");

            // Special handling for Portfolio
            if (m.href === "/") {
              return (
                <button
                  key={m.href}
                  type="button"
                  className={baseClasses}
                  onClick={() => {
                    setOpen(false);
                    // Force full reload, which resets selectedClientId in page.tsx
                    window.location.href = "/";
                  }}
                >
                  <span className="text-lg" aria-hidden>
                    {m.icon}
                  </span>
                  <span>{m.label}</span>
                </button>
              );
            }

            // Normal links for everything else
            return (
              <Link key={m.href} href={m.href} className={baseClasses}>
                <span className="text-lg" aria-hidden>
                  {m.icon}
                </span>
                <span>{m.label}</span>
              </Link>
            );
          })}
        </nav>

      </div>
    </div>
  )}

    </header>
  );
}

/* Desktop Sidebar             */
function DesktopSidebar() {
  const year = useMemo(() => new Date().getFullYear(), []);
  const pathname = usePathname();

  return (
    <aside className="hidden md:flex md:flex-col md:min-h-screen md:sticky md:top-0 md:h-screen bg-slate-900 border-r border-slate-800 p-4">
      <div className="px-2 py-2">
        <Link href="/" className="text-2xl font-bold">
         <Image
              src={Logo}
              alt={"GreenConnect Logo"}
              width={160}     // adjust size
              height={40}     // adjust size
              className="object-contain"
            />
        </Link>
      </div>

      <nav className="mt-3 flex-1 overflow-y-auto pr-1">
        <ul className="space-y-1">
          {MENU.map((m) => {
            const active = pathname === m.href;
            const baseClasses =
              "flex items-center gap-2 rounded-xl px-3 py-2 hover:bg-slate-800 transition-colors " +
              (active ? "bg-slate-800 text-white" : "text-slate-200");

            if (m.href === "/") {
              // Force reload for Portfolio
              return (
                <li key={m.href}>
                  <button
                    type="button"
                    className={baseClasses + " w-full text-left"}
                    onClick={() => {
                      window.location.href = "/";
                    }}
                  >
                    <span className="text-lg" aria-hidden>
                      {m.icon}
                    </span>
                    <span>{m.label}</span>
                  </button>
                </li>
              );
            }

            return (
              <li key={m.href}>
                <Link href={m.href} className={baseClasses}>
                  <span className="text-lg" aria-hidden>
                    {m.icon}
                  </span>
                  <span>{m.label}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>


      <div className="mt-auto pt-4 border-t border-slate-800 text-xs text-slate-400">
        © {year} GreenConnect
      </div>
    </aside>
  );
}

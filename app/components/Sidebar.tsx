"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Detect mobile viewport
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize(); // run on mount
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Close sidebar when navigating (mobile only)
  const handleNavClick = (href: string) => {
    if (isMobile) setIsOpen(false);
    window.location.href = href;
  };

  return (
    <>
      {/* Hamburger button (mobile only) */}
      {isMobile && (
        <button
          className="fixed top-4 left-4 z-30 text-gray-800 bg-white rounded-md shadow-md p-2 md:hidden"
          onClick={() => setIsOpen(true)}
        >
          ☰
        </button>
      )}

      {/* Sidebar */}
      <aside
        className={`
          ${isMobile ? (isOpen ? "translate-x-0" : "-translate-x-full") : ""}
          fixed md:static 
          inset-y-0 left-0
          w-64 bg-[#14213d] text-white flex flex-col p-6 shadow-lg 
          transition-transform duration-300 ease-in-out
          z-20
        `}
      >
        {/* Close button (mobile only) */}
        {isMobile && (
          <div className="flex items-center justify-between mb-10">
            <h1 className="text-xl font-bold">GreenConnect</h1>
            <button
              onClick={() => setIsOpen(false)}
              className="text-white text-2xl leading-none"
            >
              ×
            </button>
          </div>
        )}

        {/* Header (desktop only) */}
        {!isMobile && (
          <h1 className="text-2xl font-bold mb-10">GreenConnect</h1>
        )}

        {/* Navigation */}
        <nav className="space-y-4 text-sm">
          <button
            onClick={() => handleNavClick("/")}
            className="hover:text-green-300 flex items-center gap-2 text-left"
          >
            🏢 Portfolio
          </button>
          <Link
            href="/analytics"
            onClick={() => isMobile && setIsOpen(false)}
            className="hover:text-green-300 flex items-center gap-2"
          >
            📊 Analytics
          </Link>
          <Link
            href="/controls"
            onClick={() => isMobile && setIsOpen(false)}
            className="hover:text-green-300 flex items-center gap-2"
          >
            ⚙️ Controls
          </Link>
          <Link
            href="/ai-insights"
            onClick={() => isMobile && setIsOpen(false)}
            className="hover:text-green-300 flex items-center gap-2"
          >
            🧠 AI Insights
          </Link>
        </nav>

        {/* Footer */}
        <div className="mt-auto text-xs text-gray-400 pt-10 border-t border-gray-700">
          © 2025 GreenConnect
        </div>
      </aside>

      {/* Mobile backdrop */}
      {isMobile && isOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-10"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
}


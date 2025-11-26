"use client";

import Link from "next/link";

export default function Sidebar() {
  return (
    //<aside className="w-64 bg-[#14213d] text-white flex flex-col p-6 shadow-lg">
    <aside className="w-full md:w-64 bg-[#14213d] text-white flex flex-col p-6 shadow-lg md:h-auto">
      <h1 className="text-2xl font-bold mb-10">GreenConnect</h1>
      <nav className="space-y-4 text-sm">
        <button
          onClick={() => (window.location.href = "/")}
          className="hover:text-green-300 flex items-center gap-2 text-left"
        >
          🏢 Portfolio
        </button>
        <Link href="/analytics" className="hover:text-green-300 flex items-center gap-2">
          📊 Analytics
        </Link>
        <Link href="/controls" className="hover:text-green-300 flex items-center gap-2">
          ⚙️ Controls
        </Link>
        <Link href="/ai-insights" className="hover:text-green-300 flex items-center gap-2">
          🧠 AI Insights
        </Link>
      </nav>
      <div className="mt-auto text-xs text-gray-400 pt-10 border-t border-gray-700">
        © 2025 GreenConnect
      </div>
    </aside>
  );
}

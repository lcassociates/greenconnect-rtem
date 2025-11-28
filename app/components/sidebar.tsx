"use client";

import { sidebarMenuItems, SidebarView } from "../data/sidebarMenu";

interface SidebarProps {
  currentView: SidebarView;
  onNavigate: (view: SidebarView) => void;
}

export function Sidebar({ currentView, onNavigate }: SidebarProps) {
  return (
    <aside className="w-64 bg-[#1e293b] text-white flex flex-col">
      <div className="p-6 border-b border-gray-700">
        <div>GreenConnect</div>
      </div>

      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {sidebarMenuItems.map((item) => {
            const Icon = item.icon;
            return (
              <li key={item.id}>
                <button
                  onClick={() => onNavigate(item.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                    currentView === item.id
                      ? "bg-blue-600 text-white"
                      : "text-gray-300 hover:bg-gray-700"
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span>{item.label}</span>
                </button>
              </li>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
}

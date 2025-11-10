import "./globals.css";
import type { Metadata } from "next";
import Sidebar from "./components/Sidebar"; // 👈 import the sidebar

export const metadata: Metadata = {
  title: "GreenConnect RTEM",
  description: "Portfolio dashboard for building energy management",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="h-full">
      <body className="h-full bg-gray-100 text-gray-900 antialiased">
        <main className="flex h-full">
          <Sidebar /> {/* 👈 use the sidebar */}
          <section className="flex-1 p-8 overflow-auto">
            {children}
          </section>
        </main>
      </body>
    </html>
  );
}

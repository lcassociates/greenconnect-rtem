import "./globals.css";
import type { Metadata } from "next";
import ResponsiveLayout from "./components/layout/ResponsiveLayout";
import { Suspense } from "react"; // ⬅ add this

export const metadata: Metadata = {
  title: "GreenConnect RTEM",
  description: "GreenConnect dashboard",
  icons: {
    icon: "../images/GC-logo-square.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Suspense fallback={null}>
          <ResponsiveLayout>{children}</ResponsiveLayout>
        </Suspense>
      </body>
    </html>
  );
}

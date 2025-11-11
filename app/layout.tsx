import "./globals.css";
import type { Metadata } from "next";
import ResponsiveLayout from "./components/ResponsiveLayout";

export const metadata: Metadata = {
  title: "GreenConnect RTEM",
  description: "GreenConnect dashboard",
   icons: {
    icon: '../images/GC-logo-square.png',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <ResponsiveLayout>{children}</ResponsiveLayout>
      </body>
    </html>
  );
}

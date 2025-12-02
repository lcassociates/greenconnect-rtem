"use client";

import { Suspense } from "react";
import HomeContent from "./HomeContent";

export default function Home() {
  return (
    <Suspense fallback={<div>Loading…</div>}>
      <HomeContent />
    </Suspense>
  );
}

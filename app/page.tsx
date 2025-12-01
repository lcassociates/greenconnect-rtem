"use client";

import { useState } from "react";
import { PortfolioPage } from "./components/PortfolioPage";
import { GeneralOverviewPage } from "./components/GeneralOverviewPage";
import { clientNames } from "./data/clientNames"; 

export default function Home() {
  const [selectedClientId, setSelectedClientId] = useState<string | null>(null);

  const title = selectedClientId
    ? clientNames[selectedClientId] ?? "Client Overview"
    : "Portfolio Overview";

  return (
    <>
      {/* Header */}
      {/* <header className="bg-white h-14 sm:h-16 shadow flex items-center justify-between px-4 sm:px-8 sticky top-0 z-10">
        <h2 className="text-base sm:text-lg font-semibold truncate">
          {title}
        </h2>

        {selectedClientId && (
          <button
            className="text-xs sm:text-sm text-green-600 hover:underline"
            onClick={() => setSelectedClientId(null)}
          >
            ← Back
          </button>
        )}
      </header> */}

      {/* Body */}
      <main className="flex-1 overflow-y-auto p-3 sm:p-6 space-y-8 sm:space-y-10">
        {/* When no client selected: show the client cards */}
        {!selectedClientId && (
          <PortfolioPage
            onClientSelect={(clientId) => setSelectedClientId(clientId)}
          />
        )}

        {/* When a client is selected: show the GeneralOverviewPage */}
        {selectedClientId && (
          <GeneralOverviewPage
            clientId={selectedClientId}
            onBack={() => setSelectedClientId(null)}
          />
        )}
      </main>
    </>
  );
}

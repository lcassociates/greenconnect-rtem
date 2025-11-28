"use client";

import { useState } from "react";
import { mockPortfolios } from "./data/mockData";
import Card from "./components/Card";
import { PortfolioPage } from "./components/PortfolioPage";

export default function Home() {
  const [selectedPortfolioId, setSelectedPortfolioId] = useState<string | null>(null);
  const selectedPortfolio = mockPortfolios.find(
    (p) => p.id === selectedPortfolioId
  );

  return (
    <>
      {/* Header */}
      <header className="bg-white h-14 sm:h-16 shadow flex items-center justify-between px-4 sm:px-8 sticky top-0 z-10">
        <h2 className="text-base sm:text-lg font-semibold truncate">
          {selectedPortfolio ? selectedPortfolio.name : "Portfolio Overview"}
        </h2>
        {selectedPortfolio && (
          <button
            className="text-xs sm:text-sm text-green-600 hover:underline"
            onClick={() => setSelectedPortfolioId(null)}
          >
            ← Back
          </button>
        )}
      </header>

      {/* Body */}
      <main className="flex-1 overflow-y-auto p-3 sm:p-6 space-y-8 sm:space-y-10">
        {/* ---- Portfolio overview (client cards from PortfolioPage) ---- */}
        {!selectedPortfolio && (
          <PortfolioPage
            onClientSelect={(clientId) => setSelectedPortfolioId(clientId)}
          />
        )}

        {/* ---- Building cards for selected portfolio ---- */}
        {selectedPortfolio && (
          <div
            className="
              grid 
              grid-cols-1 
              sm:grid-cols-2 
              md:grid-cols-3 
              lg:grid-cols-4 
              xl:grid-cols-5 
              gap-4 
              sm:gap-6
            "
          >
            {selectedPortfolio.buildings.map((bldg) => (
              <Card
                key={bldg.title}
                title={bldg.title}
                subtitle={bldg.subtitle}
                image={bldg.image}
                metrics={bldg.metrics}
              />
            ))}
          </div>
        )}
      </main>
    </>
  );
}

"use client";


// Goal: Show only PortfolioCards initially. When one is clicked, show its BuildingCards.

import { useState } from "react";
import { mockPortfolios } from "./data/mockData";
import Card from "./components/Card";
import PortfolioCard from "./components/portfolioCard";
import PortfolioPreviewCard from "./components/PortfolioPreviewCard";

export default function Home() {
  const [selectedPortfolioId, setSelectedPortfolioId] = useState<string | null>(null);

  const selectedPortfolio = mockPortfolios.find(p => p.id === selectedPortfolioId);

  return (
  <>
    <header className="bg-white h-16 shadow flex items-center justify-between px-8">
      <h2 className="text-lg font-semibold">
        {selectedPortfolio ? selectedPortfolio.name : "Portfolio Overview"}
      </h2>
      {selectedPortfolio && (
        <button
          className="text-sm text-green-600 hover:underline"
          onClick={() => setSelectedPortfolioId(null)}
        >
          ← Back to Portfolios
        </button>
      )}
    </header>

    <div className="flex-1 overflow-y-auto p-6 space-y-10">
      {!selectedPortfolio && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {mockPortfolios.map((portfolio) => (
            <div
              key={portfolio.id}
              onClick={() => setSelectedPortfolioId(portfolio.id)}
              className="cursor-pointer"
            >
              <PortfolioPreviewCard
                name={portfolio.name}
                image={portfolio.image}
              />
            </div>
          ))}
        </div>
      )}

      {selectedPortfolio && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
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
    </div>
  </>
);
}

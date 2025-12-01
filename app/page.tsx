"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { PortfolioPage } from "./components/PortfolioPage";
import { GeneralOverviewPage } from "./components/GeneralOverviewPage";

export default function Home() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Read the selected client from the URL: /?clientId=...
  const selectedClientId = searchParams.get("clientId");

  const handleClientSelect = (clientId: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("clientId", clientId);
    router.push(`/?${params.toString()}`);
  };

  const handleBack = () => {
    const params = new URLSearchParams(searchParams.toString());
    params.delete("clientId");
    const qs = params.toString();
    router.push(qs ? `/?${qs}` : "/");
  };

  return (
    <div className="flex flex-col flex-1 h-full">
      <main className="flex-1 overflow-y-auto p-3 sm:p-6 space-y-8 sm:space-y-10">
        {/* When no client selected: show the client cards */}
        {!selectedClientId && (
          <PortfolioPage onClientSelect={handleClientSelect} />
        )}

        {/* When a client is selected: show the GeneralOverviewPage */}
        {selectedClientId && (
          <GeneralOverviewPage
            clientId={selectedClientId}
            onBack={handleBack}
          />
        )}
      </main>
    </div>
  );
}

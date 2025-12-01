import { ArrowLeft } from "lucide-react";
import { Button } from "../ui/button";
import { Card } from "../ui/card";

interface EnergyProcurementPageProps {
  buildingName: string;
  clientId: string;
  onBack: () => void;
}

const energyProcurementData = {
  "100 Broadway": {
    provider: "Con Edison",
    contractType: "Fixed Rate",
    startDate: "2024-01-01",
    endDate: "2026-12-31",
    rate: "$0.145/kWh",
    annualUsage: "750,000 kWh",
  },
};

export function EnergyProcurementPage({
  buildingName,
  clientId,
  onBack,
}: EnergyProcurementPageProps) {
  const energyProcurement =
    energyProcurementData[
      buildingName as keyof typeof energyProcurementData
    ];

  let daysLeft = 0;
  let percentElapsed = 0;
  let formattedEndDate = "";
  let formattedStartDate = "";

  if (energyProcurement) {
    const today = new Date();
    const start = new Date(energyProcurement.startDate);
    const end = new Date(energyProcurement.endDate);
    const msInDay = 1000 * 60 * 60 * 24;

    const totalDays = Math.max(
      1,
      Math.ceil((end.getTime() - start.getTime()) / msInDay),
    );
    const elapsedDays = Math.min(
      totalDays,
      Math.max(
        0,
        Math.ceil((today.getTime() - start.getTime()) / msInDay),
      ),
    );

    percentElapsed = (elapsedDays / totalDays) * 100;

    daysLeft = Math.max(
      0,
      Math.ceil((end.getTime() - today.getTime()) / msInDay),
    );

    formattedStartDate = start.toLocaleDateString(undefined, {
      month: "short",
      day: "numeric",
      year: "numeric",
    });

    formattedEndDate = end.toLocaleDateString(undefined, {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  }

  const countdownBg =
    daysLeft <= 30
      ? "bg-red-600"
      : daysLeft <= 60
        ? "bg-amber-500"
        : "bg-slate-900";

  return (
    <div className="h-full flex flex-col">
      <div className="bg-white border-b border-gray-200 px-8 py-6">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={onBack}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </Button>
          <h1 className="text-gray-900">{buildingName}</h1>
          <span className="text-gray-400">•</span>
          <h2 className="text-gray-600">Energy Procurement</h2>
        </div>
      </div>

      <div className="flex-1 overflow-auto">
        {energyProcurement ? (
          <div className="p-8 flex justify-center">
            <Card className="w-full max-w-md rounded-3xl shadow-md p-8">
              <h2 className="mb-6 text-center text-xl font-semibold text-slate-900">
                Energy Procurement Contract
              </h2>

              {/* Start / Expiry labels */}
              <div className="mb-2 flex items-center justify-between text-xs font-medium text-slate-500">
                <span>Start Date</span>
                <span>Expiry Date</span>
              </div>

              {/* Timeline bar */}
              <div className="mb-6">
                <div className="flex h-4 w-full overflow-hidden rounded-full bg-slate-200">
                  <div
                    className="h-full bg-emerald-500 transition-all"
                    style={{
                      width: `${Math.min(100, Math.max(0, percentElapsed))}%`,
                    }}
                  />
                  <div
                    className="h-full bg-amber-400 transition-all"
                    style={{
                      width: `${Math.max(0, 100 - percentElapsed)}%`,
                    }}
                  />
                </div>
              </div>

              {/* Countdown card */}
              <div
                className={`mb-4 rounded-2xl px-6 py-4 text-center text-white ${countdownBg}`}
              >
                <p className="text-sm uppercase tracking-wide opacity-80">
                  Time Remaining
                </p>
                <p className="mt-1 text-3xl font-semibold">
                  {daysLeft} days left
                </p>
              </div>

              {/* End date */}
              <div className="mb-6 rounded-2xl border border-slate-200 bg-slate-50 px-6 py-3 text-center">
                <p className="text-xs uppercase tracking-wide text-slate-500">
                  Contract End Date
                </p>
                <p className="mt-1 text-sm font-medium text-slate-900">
                  {formattedEndDate}
                </p>
              </div>

              {/* Details row */}
              <div className="mb-6 grid grid-cols-2 gap-4 text-xs">
                <div>
                  <p className="text-slate-500">Provider</p>
                  <p className="font-medium text-slate-900">
                    {energyProcurement.provider}
                  </p>
                </div>
                <div>
                  <p className="text-slate-500">Contract Type</p>
                  <p className="font-medium text-slate-900">
                    {energyProcurement.contractType}
                  </p>
                </div>
                <div>
                  <p className="text-slate-500">Rate</p>
                  <p className="font-medium text-slate-900">
                    {energyProcurement.rate}
                  </p>
                </div>
                <div>
                  <p className="text-slate-500">Annual Usage</p>
                  <p className="font-medium text-slate-900">
                    {energyProcurement.annualUsage}
                  </p>
                </div>
              </div>
            </Card>
          </div>
        ) : (
          <div className="p-8">
            <p className="text-gray-500">
              No energy procurement data available for this building.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

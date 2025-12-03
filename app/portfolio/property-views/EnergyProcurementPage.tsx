import { ArrowLeft } from "lucide-react";
import { Button } from "../../components/ui/button";
import { Card } from "../../components/ui/card";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

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
  "1180 Ave of Americas":{
    provider: "Con Edison",
    contractType: "Fixed Rate",
    startDate: "2024-01-01",
    endDate: "2025-11-30",
    rate: "$0.145/kWh",
    annualUsage: "750,000 kWh",
  }
};

const historicalEnergyRates = [
  { month: "Feb '23", rate: 0.125 },
  { month: "Mar '23", rate: 0.127 },
  { month: "Apr '23", rate: 0.129 },
  { month: "May '23", rate: 0.131 },
  { month: "Jun '23", rate: 0.133 },
  { month: "Jul '23", rate: 0.135 },
  { month: "Aug '23", rate: 0.137 },
  { month: "Sep '23", rate: 0.139 },
  { month: "Oct '23", rate: 0.141 },
  { month: "Nov '23", rate: 0.143 },
  { month: "Dec '23", rate: 0.145 },
  { month: "Jan '24", rate: 0.148 },
  { month: "Feb '24", rate: 0.150 },
  { month: "Mar '24", rate: 0.152 },
  { month: "Apr '24", rate: 0.154 },
  { month: "May '24", rate: 0.151 },
  { month: "Jun '24", rate: 0.149 },
  { month: "Jul '24", rate: 0.153 },
  { month: "Aug '24", rate: 0.156 },
  { month: "Sep '24", rate: 0.159 },
  { month: "Oct '24", rate: 0.162 },
  { month: "Nov '24", rate: 0.165 },
  { month: "Dec '24", rate: 0.168 },
];

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
          <div className="p-4 md:p-8 flex flex-col lg:flex-row gap-4 md:gap-8 justify-center items-stretch">
            {/* Historical Rates Chart - Left Side */}
            <Card className="flex-1 lg:max-w-2xl p-4 md:p-6">
              <h3 className="mb-4 text-gray-900">Historical Energy Rates</h3>
              <ResponsiveContainer width="100%" height={400}>
                <LineChart
                  data={historicalEnergyRates}
                  margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="rate"
                    stroke="#3b82f6"
                    strokeWidth={2}
                    activeDot={{ r: 6 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </Card>

            {/* Contract Card - Right Side */}
            <Card className="w-full lg:max-w-md rounded-3xl shadow-md p-4 md:p-6">
              <h2 className="mb-4 text-center text-slate-900">
                Energy Procurement Contract
              </h2>

              {/* Start / Today / Expiry labels */}
              <div className="mb-2 flex items-center justify-between">
                <div className="text-left">
                  <p className="text-xs font-medium text-slate-500">Start Date</p>
                  <p className="text-xs text-slate-700 mt-0.5">{formattedStartDate}</p>
                </div>
                <div className="text-center">
                  <p className="text-xs font-medium text-blue-600">Today</p>
                  <p className="text-xs text-blue-700 mt-0.5">
                    {new Date().toLocaleDateString(undefined, {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-xs font-medium text-slate-500">Expiry Date</p>
                  <p className="text-xs text-slate-700 mt-0.5">{formattedEndDate}</p>
                </div>
              </div>

              {/* Timeline bar */}
              <div className="mb-4">
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
                className={`mb-3 rounded-2xl px-6 py-3 text-center border ${daysLeft <= 0 ? 'bg-gradient-to-br from-red-50 to-red-100 border-red-200' : 'bg-gradient-to-br from-emerald-50 to-emerald-100 border-emerald-200'}`}
              >
                <p className={`text-xs uppercase tracking-wide opacity-80 ${daysLeft <= 0 ? 'text-red-700' : 'text-emerald-700'}`}>
                  Time Remaining
                </p>
                <p className={`mt-1 text-2xl font-semibold ${daysLeft <= 0 ? 'text-red-700' : 'text-emerald-700'}`}>
                  {daysLeft <= 0 ? 'Contract expired' : `${daysLeft} days left`}
                </p>
              </div>

              {/* End date */}
              <div className="mb-4 rounded-2xl border border-slate-200 bg-slate-50 px-6 py-3 text-center">
                <p className="text-xs uppercase tracking-wide text-slate-500">
                  Contract End Date
                </p>
                <p className="mt-1 text-sm font-medium text-slate-900">
                  {formattedEndDate}
                </p>
              </div>

              {/* Details row */}
              <div className="grid grid-cols-2 gap-4 text-xs">
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
          <div className="p-4 md:p-8">
            <p className="text-gray-500">
              No energy procurement data available for this building.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
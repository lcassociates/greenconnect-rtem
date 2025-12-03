"use client";

import * as React from "react";
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
import { TrendingUp, DollarSign, Calendar } from "lucide-react";

import {
  contracts,
  type EnergyContract,
} from "../../data/energyProcurement";

interface ProcurementContractProps {
  clientId: string;
}


const MS_IN_DAY = 1000 * 60 * 60 * 24;

function diffInDays(startDate: Date, todayDate: Date) {
  return todayDate.getTime() - startDate.getTime();
}

export function ProcurementContract({
  clientId,
}: ProcurementContractProps) {
  const today = new Date();

  // Compute global timeline range (min start → max end)
  const minStart = contracts
    .map((c) => new Date(c.startDate))
    .reduce((min, d) => (d < min ? d : min));

  const maxEnd = contracts
    .map((c) => new Date(c.endDate))
    .reduce((max, d) => (d > max ? d : max));

  const totalRangeDays = Math.max(
    1,
    diffInDays(minStart, maxEnd),
  );
  const todayOffsetDays = diffInDays(minStart, today);
  const todayOffsetPct =
    (todayOffsetDays / totalRangeDays) * 100;

  // Header labels: LEFT = TODAY (per your request), RIGHT = latest end date
  const headerLeftLabel =
    "Energy Procurement Contract Timeline";
  const headerRightLabel = today.toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="mx-auto max-w-5xl px-6 py-10">
        <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-slate-900">
              Energy Procurement Contracts
            </h1>
            <p className="mt-1 text-sm text-slate-600">
              Energy Contract Information
            </p>
          </div>

          {/* Legend */}
          <div className="mt-3 flex items-center gap-4 text-xs text-slate-600">
            <div className="flex items-center gap-1.5">
              <span className="h-3 w-3 rounded-full bg-emerald-500" />
              <span>Passed</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="h-3 w-3 rounded-full bg-amber-400" />
              <span>Remaining</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="h-3 w-0.5 bg-slate-500" />
              <span>Today</span>
            </div>
          </div>
        </div>

        <Card className="overflow-hidden border border-slate-200 bg-white shadow-sm">
          {/* Timeline header */}
          <div className="border-b border-slate-100 px-6 py-3 text-xs font-medium text-slate-500">
            <div className="flex justify-between">
              <span>{headerLeftLabel}</span>
              <span>Today: {headerRightLabel}</span>
            </div>
          </div>

          {/* Gantt rows */}
          <div className="divide-y divide-slate-100">
            {contracts.map((contract) => {
              const start = new Date(contract.startDate);
              const end = new Date(contract.endDate);

              const contractDurationDays = Math.max(
                1,
                diffInDays(start, end),
              );
              const startOffsetDays = diffInDays(
                minStart,
                start,
              );
              const leftPct =
                (startOffsetDays / totalRangeDays) * 100;
              const widthPct =
                (contractDurationDays / totalRangeDays) * 100;

              // Elapsed portion within the contract
              const elapsedDays = Math.min(
                contractDurationDays,
                Math.max(0, diffInDays(start, today)),
              );
              const elapsedPctWithin =
                (elapsedDays / contractDurationDays) * 100;

              // Days left vs days since expiry
              const msDiff = end.getTime() - today.getTime(); // >0 => future, <0 => past
              let daysLeft = 0;
              let daysPast = 0;

              if (msDiff >= 0) {
                daysLeft = Math.ceil(msDiff / MS_IN_DAY);
              } else {
                daysPast = Math.ceil(-msDiff / MS_IN_DAY);
              }

              const endLabel = end.toLocaleDateString(
                undefined,
                {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                },
              );

              const isExpired = msDiff < 0;

              const countdownColor = isExpired
                ? "text-red-600"
                : daysLeft <= 30
                  ? "text-red-600"
                  : daysLeft <= 60
                    ? "text-amber-600"
                    : "text-emerald-700";

              const countdownText = isExpired
                ? `${daysPast} day${daysPast === 1 ? "" : "s"} ago`
                : `${daysLeft} day${daysLeft === 1 ? "" : "s"} left`;

              const expiryPrefix = isExpired
                ? "Expired on"
                : "Expires on";

              // Generate historical energy rate data for last 2 years (24 months)
              const historicalRates = [
                { period: "Jan '23", rate: 0.125 },
                { period: "Feb '23", rate: 0.128 },
                { period: "Mar '23", rate: 0.130 },
                { period: "Apr '23", rate: 0.131 },
                { period: "May '23", rate: 0.133 },
                { period: "Jun '23", rate: 0.132 },
                { period: "Jul '23", rate: 0.134 },
                { period: "Aug '23", rate: 0.136 },
                { period: "Sep '23", rate: 0.135 },
                { period: "Oct '23", rate: 0.139 },
                { period: "Nov '23", rate: 0.141 },
                { period: "Dec '23", rate: 0.143 },
                { period: "Jan '24", rate: 0.138 },
                { period: "Feb '24", rate: 0.140 },
                { period: "Mar '24", rate: 0.142 },
                { period: "Apr '24", rate: 0.144 },
                { period: "May '24", rate: 0.146 },
                { period: "Jun '24", rate: 0.145 },
                { period: "Jul '24", rate: 0.147 },
                { period: "Aug '24", rate: 0.149 },
                { period: "Sep '24", rate: 0.150 },
                { period: "Oct '24", rate: 0.151 },
                { period: "Nov '24", rate: 0.152 },
                { period: "Dec '24", rate: 0.154 },
              ];

              // Extract numeric rate from contract.rate (e.g., "$0.145/kWh" -> 0.145)
              const currentRate = parseFloat(contract.rate.replace(/[^0-9.]/g, ""));
              
              // Calculate average cost per kWh from historical data
              const avgRate = (historicalRates.reduce((sum, r) => sum + r.rate, 0) / historicalRates.length).toFixed(3);
              
              // Calculate projected annual cost
              const annualUsageNum = parseFloat(contract.annualUsage.replace(/,/g, ""));
              const projectedCost = (annualUsageNum * currentRate).toLocaleString('en-US', { 
                style: 'currency', 
                currency: 'USD',
                minimumFractionDigits: 0,
                maximumFractionDigits: 0
              });

              return (
                <div
                  key={contract.buildingName}
                  className="flex flex-col gap-4 px-6 py-5 lg:flex-row lg:items-start lg:gap-6 border-b last:border-b-0 hover:bg-slate-50/50 transition-colors"
                >
                  {/* 1st Container: building + contract info */}
                  <div className="w-full lg:w-52 shrink-0">
                    <div className="space-y-3">
                      <div>
                        <p className="font-semibold text-slate-900 mb-0.5">
                          {contract.buildingName}
                        </p>
                        <p className="text-xs text-slate-500">
                          {contract.clientName}
                        </p>
                      </div>

                      <div className="space-y-2 text-xs border-t pt-3">
                        <div className="flex justify-between items-start">
                          <span className="text-slate-500">Provider:</span>
                          <span className="font-medium text-slate-900 text-right">{contract.provider}</span>
                        </div>
                        <div className="flex justify-between items-start">
                          <span className="text-slate-500">Contract:</span>
                          <span className="font-medium text-slate-900 text-right">{contract.contractType}</span>
                        </div>
                        <div className="flex justify-between items-start">
                          <span className="text-slate-500">Rate:</span>
                          <span className="font-medium text-blue-700 text-right">{contract.rate}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* 2nd Container: Historical Line Graph */}
                  <div className="flex-1 min-w-0">
                    <div className="h-32">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={historicalRates} margin={{ top: 5, right: 5, left: 0, bottom: 5 }}>
                          <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                          <XAxis 
                            dataKey="period" 
                            tick={{ fontSize: 10 }}
                            stroke="#64748b"
                            interval="preserveStartEnd"
                          />
                          <YAxis 
                            tick={{ fontSize: 10 }}
                            stroke="#64748b"
                            domain={[0.12, 0.16]}
                            tickFormatter={(value) => `$${value.toFixed(2)}`}
                          />
                          <Tooltip 
                            formatter={(value: number) => `$${value.toFixed(3)}/kWh`}
                            contentStyle={{ fontSize: 12 }}
                          />
                          <Line 
                            type="monotone" 
                            dataKey="rate" 
                            stroke="#3b82f6" 
                            strokeWidth={2}
                            dot={{ fill: "#3b82f6", r: 2 }}
                          />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                    <p className="text-[10px] text-slate-500 text-center mt-1">
                      Historical Energy Rates ($/kWh)
                    </p>
                  </div>

                  {/* 3rd Container: Key Metrics */}
                  <div className="w-full lg:w-56 shrink-0 space-y-2.5">
                    <div className="bg-gradient-to-br from-slate-50 to-slate-100 border border-slate-200 rounded-lg p-3 shadow-sm">
                      <div className="flex items-center gap-2 mb-1.5">
                        <TrendingUp className="h-4 w-4 text-slate-600" />
                        <p className="text-[10px] font-medium text-slate-600 uppercase tracking-wide">Avg Cost per kWh</p>
                      </div>
                      <p className="text-xl font-bold text-slate-900">${avgRate}</p>
                    </div>
                    
                    <div className="bg-gradient-to-br from-blue-50 to-blue-100 border border-blue-200 rounded-lg p-3 shadow-sm">
                      <div className="flex items-center gap-2 mb-1.5">
                        <DollarSign className="h-4 w-4 text-blue-700" />
                        <p className="text-[10px] font-medium text-blue-700 uppercase tracking-wide">Projected Annual</p>
                      </div>
                      <p className="text-xl font-bold text-blue-900">{projectedCost}</p>
                    </div>
                    
                    <div className={`${isExpired ? 'bg-gradient-to-br from-red-50 to-red-100 border-red-200' : 'bg-gradient-to-br from-emerald-50 to-emerald-100 border-emerald-200'} border rounded-lg p-3 shadow-sm`}>
                      <div className="flex items-center gap-2 mb-1.5">
                        <Calendar className={`h-4 w-4 ${isExpired ? 'text-red-700' : 'text-emerald-700'}`} />
                        <p className={`text-[10px] font-medium uppercase tracking-wide ${isExpired ? 'text-red-700' : 'text-emerald-700'}`}>
                          {expiryPrefix}
                        </p>
                      </div>
                      <p className="text-xs font-medium text-slate-700 mb-0.5">
                        {endLabel}
                      </p>
                      <p className={`text-base font-bold ${countdownColor}`}>
                        {countdownText}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </Card>
      </div>
    </div>
  );
}
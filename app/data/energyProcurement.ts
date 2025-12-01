export type EnergyContract = {
  buildingName: string;
  clientName: string;
  provider: string;
  contractType: string;
  startDate: string; 
  endDate: string;   
  rate: string;
  annualUsage: string;
};

export const contracts: EnergyContract[] = [
  {
    buildingName: "100 Broadway",
    clientName: "Acme Corp",
    provider: "Con Edison",
    contractType: "Fixed Rate",
    startDate: "2024-01-01",
    endDate: "2026-12-31",
    rate: "$0.145/kWh",
    annualUsage: "2,450,000 kWh",
  },
  {
    buildingName: "200 Madison Ave",
    clientName: "Brightline LLC",
    provider: "National Grid",
    contractType: "Indexed",
    startDate: "2023-06-01",
    endDate: "2025-05-31",
    rate: "Day-ahead LMP + $0.02",
    annualUsage: "1,800,000 kWh",
  },
  {
    buildingName: "350 Hudson St",
    clientName: "Greenway Partners",
    provider: "Con Edison",
    contractType: "Block & Index",
    startDate: "2022-09-01",
    endDate: "2024-08-31",
    rate: "$0.132/kWh",
    annualUsage: "3,050,000 kWh",
  },
];

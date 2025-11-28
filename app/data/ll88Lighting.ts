// app/data/ll88Lighting.ts

export interface LL88LightingRow {
  building: string;
  status: string;
  upgradeYear: number;
  savings: string;
  costSavings: string;
}

export const ll88LightingData: LL88LightingRow[] = [
  {
    building: "100 Broadway",
    status: "Completed",
    upgradeYear: 2023,
    savings: "45,000 kWh",
    costSavings: "$6,750",
  },
  {
    building: "1180 Ave of Americas",
    status: "In Progress",
    upgradeYear: 2025,
    savings: "38,000 kWh",
    costSavings: "$5,890",
  },
  {
    building: "135 W 27th St",
    status: "Completed",
    upgradeYear: 2024,
    savings: "28,000 kWh",
    costSavings: "$4,340",
  },
  {
    building: "1370 Ave of the Americas",
    status: "Not Started",
    upgradeYear: 2026,
    savings: "52,000 kWh",
    costSavings: "$8,060",
  },
  {
    building: "175 Pearl St",
    status: "Completed",
    upgradeYear: 2023,
    savings: "31,000 kWh",
    costSavings: "$4,650",
  },
  {
    building: "320 W 21st St",
    status: "In Progress",
    upgradeYear: 2025,
    savings: "22,000 kWh",
    costSavings: "$3,410",
  },
  {
    building: "47-37 Austell Place",
    status: "Exempt",
    upgradeYear: 2024,
    savings: "19,000 kWh",
    costSavings: "$2,945",
  },
  {
    building: "520 Broadway",
    status: "Due",
    upgradeYear: 2026,
    savings: "41,000 kWh",
    costSavings: "$6,355",
  },
  {
    building: "524 Broadway",
    status: "Completed",
    upgradeYear: 2024,
    savings: "35,000 kWh",
    costSavings: "$5,425",
  },
  {
    building: "575 Lexington Ave",
    status: "In Progress",
    upgradeYear: 2025,
    savings: "47,000 kWh",
    costSavings: "$7,285",
  },
];

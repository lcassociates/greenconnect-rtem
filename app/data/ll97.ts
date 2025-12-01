
export interface LL97Row {
  building: string;
  ghgScore: number;
  exceedEmissions: number;
  penalty2030: number;
}

export interface LL97ProjectRow {
  building: string;
  project: string;
  ghgReduction: number;
  kwhSavings: number;
  incentive: number;
}

export const LL97Data: LL97Row[] = [
  {
    building: "100 Broadway",
    ghgScore: 5.2,
    exceedEmissions: 450,
    penalty2030: 125000,
  },
  {
    building: "1180 Ave of Americas",
    ghgScore: 4.86,
    exceedEmissions: 380,
    penalty2030: 98000,
  },
  {
    building: "135 W 27th St",
    ghgScore: 3.8,
    exceedEmissions: 0,
    penalty2030: 0,
  },
  {
    building: "1370 Ave of the Americas",
    ghgScore: 7.34,
    exceedEmissions: 890,
    penalty2030: 245000,
  },
  {
    building: "175 Pearl St",
    ghgScore: 4.2,
    exceedEmissions: 0,
    penalty2030: 0,
  },
  {
    building: "320 W 21st St",
    ghgScore: 3.5,
    exceedEmissions: 0,
    penalty2030: 0,
  },
  {
    building: "47-37 Austell Place",
    ghgScore: 4.1,
    exceedEmissions: 0,
    penalty2030: 0,
  },
  {
    building: "520 Broadway",
    ghgScore: 6.38,
    exceedEmissions: 620,
    penalty2030: 175000,
  },
  {
    building: "524 Broadway",
    ghgScore: 4.8,
    exceedEmissions: 280,
    penalty2030: 78000,
  },
  {
    building: "575 Lexington Ave",
    ghgScore: 3.9,
    exceedEmissions: 0,
    penalty2030: 0,
  },
];

export const allProjectData: LL97ProjectRow[] = [
  {
    building: "100 Broadway",
    project: "HVAC Optimization",
    ghgReduction: 0.8,
    kwhSavings: 125000,
    incentive: 45000,
  },
  {
    building: "1180 Ave of Americas",
    project: "LED Lighting Upgrade",
    ghgReduction: 0.5,
    kwhSavings: 85000,
    incentive: 32000,
  },
  {
    building: "1370 Ave of the Americas",
    project: "Building Envelope Improvement",
    ghgReduction: 1.2,
    kwhSavings: 185000,
    incentive: 68000,
  },
  {
    building: "520 Broadway",
    project: "Smart Meter Installation",
    ghgReduction: 0.3,
    kwhSavings: 45000,
    incentive: 18000,
  },
  {
    building: "524 Broadway",
    project: "Window Replacement",
    ghgReduction: 0.6,
    kwhSavings: 95000,
    incentive: 38000,
  },
  {
    building: "100 Broadway",
    project: "Solar Panel Installation",
    ghgReduction: 1.1,
    kwhSavings: 165000,
    incentive: 72000,
  },
];


export interface SubMeteringInfo {
  status: string;
  totalMeters: number;
  metersInstalled: number;
  tenants: number;
  installDate: string;
  lastReading: string;
  deadline: string;
}

export const subMeteringData: Record<string, SubMeteringInfo> = {
  "100 Broadway": {
    status: "Completed",
    totalMeters: 32,
    metersInstalled: 32,
    tenants: 18,
    installDate: "2023-08-15",
    lastReading: "2024-11-15",
    deadline: "2025-01-01",
  },
  "1180 Ave of Americas": {
    status: "In Progress",
    totalMeters: 45,
    metersInstalled: 38,
    tenants: 24,
    installDate: "2024-03-01",
    lastReading: "2024-11-20",
    deadline: "2025-06-01",
  },
};

// Building card info
export interface BuildingInfo {
  title: string;
  subtitle: string;
  image: string;
  energyStar: number;
  ll97Score: number;
  compliance: number;
}

export const buildingData: Record<string, BuildingInfo> = {
  "100 Broadway": {
    title: "100 Broadway",
    subtitle: "SoHo",
    image:
      "https://images.unsplash.com/photo-1694702740570-0a31ee1525c7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBvZmZpY2UlMjBidWlsZGluZ3xlbnwxfHx8fDE3NjMwNTQ1NTF8MA&ixlib=rb-4.1.0&q=80&w=1080",
    energyStar: 87,
    ll97Score: 3.64,
    compliance: 2026,
  },
  "1180 Ave of Americas": {
    title: "1180 Ave of Americas",
    subtitle: "Manhattan",
    image:
      "https://images.unsplash.com/photo-1762867089896-e51054249a41?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb21tZXJjaWFsJTIwYnVpbGRpbmclMjBleHRlcmlvcnxlbnwxfHx8fDE3NjMxMjEwNjd8MA&ixlib=rb-4.1.0&q=80&w=1080",
    energyStar: 75,
    ll97Score: 4.86,
    compliance: 2022,
  },
};

// Active projects
export interface ActiveProjectItem {
  name: string;
  type: string;
  status: string;
  ghgReduction: string;
  projectCost: string;
  estIncentives: string;
  annualSavings: string;
  kwhSavings: string;
}

export interface ActiveProjectsInfo {
  status: string;
  totalProjects: number;
  completedProjects: number;
  projects: ActiveProjectItem[];
}

export const activeProjectsData: Record<string, ActiveProjectsInfo> = {
  "100 Broadway": {
    status: "In Progress",
    totalProjects: 3,
    completedProjects: 1,
    projects: [
      {
        name: "HVAC Optimization",
        type: "Energy Efficiency",
        status: "In Progress",
        ghgReduction: "12.5%",
        projectCost: "$125,000",
        estIncentives: "$18,750",
        annualSavings: "$24,800",
        kwhSavings: "186,000",
      },
      {
        name: "Smart Meter Installation",
        type: "Smart Metering",
        status: "In Progress",
        ghgReduction: "8.2%",
        projectCost: "$85,000",
        estIncentives: "$12,750",
        annualSavings: "$16,500",
        kwhSavings: "124,000",
      },
      {
        name: "LED Lighting Upgrade",
        type: "Energy Efficiency",
        status: "Completed",
        ghgReduction: "5.8%",
        projectCost: "$45,000",
        estIncentives: "$6,750",
        annualSavings: "$12,200",
        kwhSavings: "92,000",
      },
    ],
  },
  "1180 Ave of Americas": {
    status: "In Progress",
    totalProjects: 4,
    completedProjects: 2,
    projects: [
      {
        name: "BMS Controls",
        type: "Energy Efficiency",
        status: "In Progress",
        ghgReduction: "15.2%",
        projectCost: "$285,000",
        estIncentives: "$42,750",
        annualSavings: "$38,500",
        kwhSavings: "289,000",
      },
      {
        name: "HVAC",
        type: "Energy Efficiency",
        status: "Completed",
        ghgReduction: "10.5%",
        projectCost: "$195,000",
        estIncentives: "$29,250",
        annualSavings: "$28,800",
        kwhSavings: "216,000",
      },
      {
        name: "Boiler Upgrade",
        type: "Energy Efficiency",
        status: "Completed",
        ghgReduction: "8.9%",
        projectCost: "$145,000",
        estIncentives: "$21,750",
        annualSavings: "$22,400",
        kwhSavings: "168,000",
      },
      {
        name: "LED Lightings",
        type: "Energy Efficiency",
        status: "In Progress",
        ghgReduction: "18.5%",
        projectCost: "$425,000",
        estIncentives: "$63,750",
        annualSavings: "$48,200",
        kwhSavings: "362,000",
      },
    ],
  },
};

// DOB compliance
export interface DobComplianceItem {
  type: string;
  dueDate: string;
  status: string;
  filingNumber: string;
}

export const dobComplianceData: Record<string, DobComplianceItem[]> = {
  "100 Broadway": [
    {
      type: "LL87 Energy Audit",
      dueDate: "2025-05-01",
      status: "In Progress",
      filingNumber: "EA-2025-001234",
    },
    {
      type: "LL84 Benchmarking",
      dueDate: "2025-05-01",
      status: "Completed",
      filingNumber: "BM-2024-005678",
    },
    {
      type: "LL97 Emissions",
      dueDate: "2026-01-01",
      status: "Planning",
      filingNumber: "N/A",
    },
  ],
};

// Energy procurement
export interface EnergyProcurementInfo {
  provider: string;
  contractType: string;
  startDate: string;
  endDate: string;
  rate: string;
  annualUsage: string;
}

export const energyProcurementData: Record<string, EnergyProcurementInfo> = {
  "100 Broadway": {
    provider: "Con Edison",
    contractType: "Fixed Rate",
    startDate: "2024-01-01",
    endDate: "2026-12-31",
    rate: "$0.145/kWh",
    annualUsage: "750,000 kWh",
  },
};

// Equipment schedules
export interface EquipmentScheduleItem {
  equipmentType: string;
  floor: string;
  areaDescription: string;
  make: string;
  model: string;
  serialNo: string;
  installYr: number;
  lifespan: number;
}

export const equipmentSchedulesData: Record<string, EquipmentScheduleItem[]> =
  {
    "100 Broadway": [
      {
        equipmentType: "AC Packaged Unit",
        floor: "LL3",
        areaDescription: "Water Meter Room",
        make: "Trane",
        model: "GEVE06041G01B0TLD01010010000000000A",
        serialNo: "W20B04180",
        installYr: 1989,
        lifespan: 15,
      },
      {
        equipmentType: "Chiller",
        floor: "1",
        areaDescription: "Mechanical Room",
        make: "Trane",
        model: "SCWH05042A01010",
        serialNo: "B1211S0011",
        installYr: 2000,
        lifespan: 15,
      },
      {
        equipmentType: "Hot Water Pump",
        floor: "Lobby",
        areaDescription: "Building Maintained",
        make: "Siemens Energy & Automation",
        model: "51-533-443",
        serialNo: "X0801",
        installYr: 1990,
        lifespan: 15,
      },
      {
        equipmentType: "Heat Exchanger",
        floor: "25",
        areaDescription: "Mechanical Room",
        make: "Trane",
        model: "SWUD020FBA",
        serialNo: "T89A00053",
        installYr: 1998,
        lifespan: 15,
      },
      {
        equipmentType: "Unit Heater",
        floor: "15",
        areaDescription: "Mechanical Room",
        make: "Trane",
        model: "SWUD032FDA",
        serialNo: "T89A00054",
        installYr: 2020,
        lifespan: 15,
      },
    ],
  };

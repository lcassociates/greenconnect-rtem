// app/data/propertyOverview.ts

export interface RecentActivity {
  id: number;
  action: string;
  building: string;
  date: string;
  status: "completed" | "in-progress" | "pending";
}

export interface UpcomingDeadline {
  id: number;
  task: string;
  building: string;
  deadline: string;
  priority: "high" | "medium" | "low";
}

export interface PortfolioStats {
  totalProperties: number;
  activeProjects: number;
  annualEnergySavings: number; // kWh
  costSavingsYTD: number; // in thousands
  costSavingsChangePct: number;
}

export const portfolioStats: PortfolioStats = {
  totalProperties: 10,
  activeProjects: 8,
  annualEnergySavings: 340000,
  costSavingsYTD: 42.5,
  costSavingsChangePct: 12,
};

export const recentActivities: RecentActivity[] = [
  {
    id: 1,
    action: "Completed energy audit",
    building: "100 Broadway",
    date: "Nov 15, 2025",
    status: "completed",
  },
  {
    id: 2,
    action: "LL87 filing submitted",
    building: "1180 Ave of Americas",
    date: "Nov 14, 2025",
    status: "completed",
  },
  {
    id: 3,
    action: "HVAC upgrade in progress",
    building: "1370 Ave of the Americas",
    date: "Nov 12, 2025",
    status: "in-progress",
  },
  {
    id: 4,
    action: "Procurement contract renewal",
    building: "Portfolio-wide",
    date: "Nov 10, 2025",
    status: "pending",
  },
  {
    id: 5,
    action: "LED retrofit completed",
    building: "520 Broadway",
    date: "Nov 8, 2025",
    status: "completed",
  },
];

export const upcomingDeadlines: UpcomingDeadline[] = [
  {
    id: 1,
    task: "LL87 Benchmarking Report",
    building: "Multiple Properties",
    deadline: "Dec 1, 2025",
    priority: "high",
  },
  {
    id: 2,
    task: "Energy Star Recertification",
    building: "175 Pearl St",
    deadline: "Dec 15, 2025",
    priority: "medium",
  },
  {
    id: 3,
    task: "LL97 Compliance Review",
    building: "100 Broadway",
    deadline: "Jan 5, 2026",
    priority: "high",
  },
];

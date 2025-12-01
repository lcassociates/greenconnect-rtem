
export type LL88SubmeteringStatus =
  | "Completed"
  | "In Progress"
  | "Not Started"
  | "Due"
  | "Exempt";

export interface LL88SubmeteringRow {
  building: string;
  status: LL88SubmeteringStatus;
  installationYear: number;
  meterCount: number;
  tenants: number;
}

export const LL88SubmeteringData: LL88SubmeteringRow[] = [
  {
    building: "100 Broadway",
    status: "Completed",
    installationYear: 2022,
    meterCount: 45,
    tenants: 28,
  },
  {
    building: "1180 Ave of Americas",
    status: "In Progress",
    installationYear: 2025,
    meterCount: 38,
    tenants: 22,
  },
  {
    building: "135 W 27th St",
    status: "Completed",
    installationYear: 2023,
    meterCount: 28,
    tenants: 15,
  },
  {
    building: "1370 Ave of the Americas",
    status: "Due",
    installationYear: 2026,
    meterCount: 52,
    tenants: 35,
  },
  {
    building: "175 Pearl St",
    status: "Completed",
    installationYear: 2022,
    meterCount: 31,
    tenants: 18,
  },
  {
    building: "320 W 21st St",
    status: "In Progress",
    installationYear: 2025,
    meterCount: 22,
    tenants: 12,
  },
  {
    building: "47-37 Austell Place",
    status: "Exempt",
    installationYear: 2023,
    meterCount: 19,
    tenants: 10,
  },
  {
    building: "520 Broadway",
    status: "Not Started",
    installationYear: 2026,
    meterCount: 41,
    tenants: 25,
  },
  {
    building: "524 Broadway",
    status: "Completed",
    installationYear: 2023,
    meterCount: 35,
    tenants: 20,
  },
  {
    building: "575 Lexington Ave",
      status: "In Progress",
      installationYear: 2025,
      meterCount: 47,
      tenants: 30,
  },
];

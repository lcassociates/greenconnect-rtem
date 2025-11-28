
export type LL84Status =
  | "Compliant"
  | "In Progress"
  | "Not Started"
  | "Due"
  | "Exempt";

export interface LL84Row {
  building: string;
  status: string;
  compliance: number;
}

export const ll84Data: LL84Row[] = [
  {
    building: "100 Broadway",
    status: "Not Started",
    compliance: 2025,
  },
  {
    building: "1180 Ave of Americas",
    status: "Compliant",
    compliance: 2025,
  },
  {
    building: "135 W 27th St",
    status: "In Progress",
    compliance: 2025,
  },
  {
    building: "1370 Ave of the Americas",
    status: "Compliant",
    compliance: 2027,
  },
  {
    building: "175 Pearl St",
    status: "In Progress",
    compliance: 2023,
  },
  {
    building: "320 W 21st St",
    status: "Due",
    compliance: 2025,
  },
  {
    building: "47-37 Austell Place",
    status: "In Progress",
    compliance: 2024,
  },
  {
    building: "520 Broadway",
    status: "Not Started",
    compliance: 2025,
  },
  {
    building: "524 Broadway",
    status: "In Progress",
    compliance: 2025,
  },
  {
    building: "575 Lexington Ave",
    status: "Compliant",
    compliance: 2026,
  },
  {
    building: "1250 Broadway",
    status: "Due",
    compliance: 2025,
  },
  {
    building: "750 Third Ave",
    status: "Exempt",
    compliance: 2024,
  },
];

export interface ActiveProjectsProps {
  clientId: string;
}

// Building data for property cards
export const buildingData: Record<
  string,
  {
    title: string;
    subtitle: string;
    image: string;
    energyStar: number;
    ll97Score: number;
    compliance: number;
  }
> = {
  "269 11th Ave": {
    title: "269 11th Ave",
    subtitle: "Chelsea",
    image:
      "https://images.unsplash.com/photo-1694702740570-0a31ee1525c7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBvZmZpY2UlMjBidWlsZGluZ3xlbnwxfHx8fDE3NjMwNTQ1NTF8MA&ixlib=rb-4.1.0&q=80&w=1080",
    energyStar: 82,
    ll97Score: 3.89,
    compliance: 2024,
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
  "1370 Ave of the Americas": {
    title: "1370 Ave of the Americas",
    subtitle: "Manhattan",
    image:
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxza3lzY3JhcGVyJTIwYnVpbGRpbmd8ZW58MXx8fHwxNzYzMzk1MDM5fDA&ixlib=rb-4.1.0&q=80&w=1080",
    energyStar: 88,
    ll97Score: 4.12,
    compliance: 2028,
  },
  "520 Broadway": {
    title: "520 Broadway",
    subtitle: "SoHo",
    image:
      "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb21tZXJjaWFsJTIwcmVhbCUyMGVzdGF0ZXxlbnwxfHx8fDE3NjMzOTUwNTZ8MA&ixlib=rb-4.1.0&q=80&w=1080",
    energyStar: 79,
    ll97Score: 4.25,
    compliance: 2027,
  },
  "175 Pearl St": {
    title: "175 Pearl St",
    subtitle: "Financial District",
    image:
      "https://images.unsplash.com/photo-1582407947304-fd86f028f716?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvZmZpY2UlMjBidWlsZGluZyUyMGV4dGVyaW9yfGVufDF8fHx8MTc2MzM5NTA3OHww&ixlib=rb-4.1.0&q=80&w=1080",
    energyStar: 91,
    ll97Score: 3.28,
    compliance: 2023,
  },
};

export const activeProjectsByProperty = [
  {
    property: "269 11th Ave",
    projects: [
      {
        name: "269 11th Ave- Terminal Warehouse",
        type: "LED Lighting",
        status: "04 App Sent to Customer - Waiting for Signature",
        ghgReduction: "0.75",
        projectCost: "$125,000",
        estIncentives: "$18,750",
        annualSavings: "$24,800",
        kwhSavings: "16,000",
      },
      {
        name: "269 11th Ave- Elevator Mod",
        type: "Elevator-Elevator Modernization",
        status: "15 Post Inspection Complete - Awaiting Payment",
        ghgReduction: "2.00",
        projectCost: "$85,000",
        estIncentives: "$12,750",
        annualSavings: "$16,500",
        kwhSavings: "14,000",
      },
    ],
  },
  {
    property: "1180 Ave of Americas",
    projects: [
      {
        name: "Submetering-Local Law 88",
        type: "Energy Efficiency",
        status: "10 Under Implementation",
        ghgReduction: "1.20",
        projectCost: "$210,000",
        estIncentives: "$31,500",
        annualSavings: "$42,000",
        kwhSavings: "15,000",
      },
    ],
  },
  {
    property: "1370 Ave of the Americas",
    projects: [
      {
        name: "1370 AOA Duane Reade DHW",
        type: "Domestic Hot Water (DHW)-Clean Heat",
        status: "00 In Progress - Sign LCA Form if applicable",
        ghgReduction: "3.20",
        projectCost: "$450,000",
        estIncentives: "$67,500",
        annualSavings: "$68,500",
        kwhSavings: "14,000",
      },
      {
        name: "1370 AOA Duane Reade Clean Heat",
        type: "HVAC-Clean Heat Program",
        status: "10 Under Implementation",
        ghgReduction: "3.50",
        projectCost: "$580,000",
        estIncentives: "$87,000",
        annualSavings: "$82,400",
        kwhSavings: "618,000",
      },
    ],
  },
  {
    property: "520 Broadway",
    projects: [
      {
        name: "Sub Meter Installation",
        type: "Sub Metering",
        status: "00 In Progress - Sign LCA Form if applicable",
        ghgReduction: "0",
        projectCost: "$7,000",
        estIncentives: "$10,800",
        annualSavings: "$0",
        kwhSavings: "0",
      },
    ],
  },
  {
    property: "175 Pearl St",
    projects: [
      {
        name: "HVAC-Chillers",
        type: "Water Efficiency",
        status: "08 PIOL Received - Needs Signature",
        ghgReduction: "2.75",
        projectCost: "$95,000",
        estIncentives: "$14,250",
        annualSavings: "$18,600",
        kwhSavings: "89,00", 
      },
    ],
  },
];

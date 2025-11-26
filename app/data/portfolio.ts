
export interface Building {
  id: string;
  title: string;
  subtitle: string;
  image: string;
  metrics: {
    energyStar: number;
    ll97Score: number;
    compliance: number;
  };
}

export interface Portfolio {
  id: string;
  name: string;
  region: string;
  image: string;
  buildings: Building[];
}

// --- DOB Compliance ---

export interface DOBComplianceItem {
  type: string;
  dueDate: string;        
  status: string;        
  filingNumber: string;   
}

export type DOBComplianceData = Record<string, DOBComplianceItem[]>;

// --- Energy Procurement ---

export interface EnergyProcurementContract {
  provider: string;      
  contractType: string;  
  startDate: string;     
  endDate: string;        
  rate: string;          
  annualUsage: string;    
}

export type EnergyProcurementData = Record<string, EnergyProcurementContract>;

// --- Equipment Schedules ---

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

export type EquipmentSchedulesData = Record<string, EquipmentScheduleItem[]>;

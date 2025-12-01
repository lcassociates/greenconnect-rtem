import { ArrowLeft } from "lucide-react";
import { Button } from "../ui/button";
import { Card } from "../ui/card";
import { Badge } from "../ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";

interface EquipmentSchedulePageProps {
  buildingName: string;
  clientId: string;
  onBack: () => void;
}

const equipmentSchedulesData = {
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

const getStatusColor = (status: string) => {
  switch (status) {
    case "Yes":
      return "bg-red-100 text-red-800";
    case "No":
      return "bg-green-100 text-green-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

export function EquipmentSchedulePage({
  buildingName,
  clientId,
  onBack,
}: EquipmentSchedulePageProps) {
  const equipmentSchedules =
    equipmentSchedulesData[
      buildingName as keyof typeof equipmentSchedulesData
    ] || [];

  return (
    <div className="h-full flex flex-col">
      <div className="bg-white border-b border-gray-200 px-8 py-6">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={onBack}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </Button>
          <h1 className="text-gray-900">{buildingName}</h1>
          <span className="text-gray-400">•</span>
          <h2 className="text-gray-600">Equipment Schedules</h2>
        </div>
      </div>

      <div className="flex-1 overflow-auto">
        <div className="p-8">
          <h2 className="mb-6 text-gray-900">Equipment Schedules</h2>

          {equipmentSchedules.length > 0 ? (
            <Card className="p-6">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Equipment</TableHead>
                      <TableHead>Floor</TableHead>
                      <TableHead>Area Description</TableHead>
                      <TableHead>Manufacturer</TableHead>
                      <TableHead>Model</TableHead>
                      <TableHead>Serial No.</TableHead>
                      <TableHead>Install Year</TableHead>
                      <TableHead>Lifespan</TableHead>
                      <TableHead>Age</TableHead>
                      <TableHead>End of Life</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {equipmentSchedules.map((item, idx) => {
                      const currentYear = new Date().getFullYear();
                      const age = currentYear - item.installYr;
                      const endOfLife = age > item.lifespan ? "Yes" : "No";

                      return (
                        <TableRow key={idx}>
                          <TableCell>{item.equipmentType}</TableCell>
                          <TableCell>{item.floor}</TableCell>
                          <TableCell>{item.areaDescription}</TableCell>
                          <TableCell>{item.make}</TableCell>
                          <TableCell>{item.model}</TableCell>
                          <TableCell>{item.serialNo}</TableCell>
                          <TableCell>{item.installYr}</TableCell>
                          <TableCell>{item.lifespan}</TableCell>
                          <TableCell>{age}</TableCell>
                          <TableCell>
                            <Badge className={getStatusColor(endOfLife)}>
                              {endOfLife}
                            </Badge>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </div>
            </Card>
          ) : (
            <p className="text-gray-500">
              No equipment schedules for this building.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

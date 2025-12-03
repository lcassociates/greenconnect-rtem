import { ArrowLeft } from "lucide-react";
import { Button } from "../../components/ui/button";
import { Card } from "../../components/ui/card";
import { Badge } from "../../components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../components/ui/table";

interface DOBCompliancePageProps {
  buildingName: string;
  clientId: string;
  onBack: () => void;
}

const dobComplianceData = {
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

const getStatusColor = (status: string) => {
  switch (status) {
    case "Completed":
      return "bg-green-100 text-green-800";
    case "In Progress":
      return "bg-blue-100 text-blue-800";
    case "Planning":
      return "bg-purple-100 text-purple-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

export function DOBCompliancePage({
  buildingName,
  clientId,
  onBack,
}: DOBCompliancePageProps) {
  const dobCompliance =
    dobComplianceData[buildingName as keyof typeof dobComplianceData] || [];

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
          <h2 className="text-gray-600">DOB Compliance</h2>
        </div>
      </div>

      <div className="flex-1 overflow-auto">
        <div className="p-8">
          <h2 className="mb-6 text-gray-900">DOB Compliance</h2>

          {dobCompliance.length > 0 ? (
            <Card className="p-6">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Compliance Type</TableHead>
                      <TableHead>Due Date</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Filing Number</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {dobCompliance.map((item, idx) => (
                      <TableRow key={idx}>
                        <TableCell>{item.type}</TableCell>
                        <TableCell>{item.dueDate}</TableCell>
                        <TableCell>
                          <Badge className={getStatusColor(item.status)}>
                            {item.status}
                          </Badge>
                        </TableCell>
                        <TableCell>{item.filingNumber}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </Card>
          ) : (
            <p className="text-gray-500">
              No DOB compliance data for this building.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

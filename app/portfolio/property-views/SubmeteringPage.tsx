import { ArrowLeft } from "lucide-react";
import { Button } from "../../components/ui/button";
import { Card } from "../../components/ui/card";
import { Badge } from "../../components/ui/badge";

interface SubMeteringPageProps {
  buildingName: string;
  clientId: string;
  onBack: () => void;
}

const subMeteringData = {
  "100 Broadway": {
    status: "Completed",
    totalMeters: 32,
    tenants: 18,
    installDate: "2023-08-15",
    lastReading: "2024-11-15",
    deadline: "2025-01-01",
  },
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

export function SubmeteringPage({
  buildingName,
  clientId,
  onBack,
}: SubMeteringPageProps) {
  const subMetering =
    subMeteringData[buildingName as keyof typeof subMeteringData];

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
          <h2 className="text-gray-600">Sub-Metering</h2>
        </div>
      </div>

      <div className="flex-1 overflow-auto">
        {subMetering ? (
          <div className="p-8">
            <h2 className="mb-6 text-gray-900">Sub-Metering Project</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              <Card className="p-6">
                <p className="text-sm text-gray-600 mb-2">Project Status</p>
                <div className="flex items-center gap-2">
                  <Badge className={getStatusColor(subMetering.status)}>
                    {subMetering.status}
                  </Badge>
                </div>
              </Card>
              <Card className="p-6">
                <p className="text-sm text-gray-600 mb-2">Total Meters</p>
                <p className="text-gray-900">{subMetering.totalMeters}</p>
              </Card>
              <Card className="p-6">
                <p className="text-sm text-gray-600 mb-2">Number of Tenants</p>
                <p className="text-gray-900">{subMetering.tenants}</p>
              </Card>
            </div>
          </div>
        ) : (
          <div className="p-8">
            <p className="text-gray-500">
              No sub-metering data available for this building.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

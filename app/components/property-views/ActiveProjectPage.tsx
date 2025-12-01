import { ArrowLeft } from "lucide-react";
import { Button } from "../ui/button";
import { Card } from "../ui/card";
import { Badge } from "../ui/badge";

interface ActiveProjectPageProps {
  buildingName: string;
  clientId: string;
  onBack: () => void;
}

const activeProjectsData = {
  "100 Broadway": [
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

export function ActiveProjectPage({
  buildingName,
  clientId,
  onBack,
}: ActiveProjectPageProps) {
  const activeProjects =
    activeProjectsData[buildingName as keyof typeof activeProjectsData] || [];

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
          <h2 className="text-gray-600">Active Projects</h2>
        </div>
      </div>

      <div className="flex-1 overflow-auto">
        <div className="p-8">
          <h2 className="mb-6 text-gray-900">Active Projects</h2>

          {activeProjects.length > 0 ? (
            <Card className="p-6">
              <h3 className="mb-4 text-gray-900">Property: {buildingName}</h3>

              <div className="space-y-4">
                {activeProjects.map((project, idx) => (
                  <div
                    key={idx}
                    className="flex items-start justify-between p-4 bg-gray-50 rounded-lg"
                  >
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <p className="text-gray-900">{project.name}</p>
                        <Badge className={getStatusColor(project.status)}>
                          {project.status}
                        </Badge>
                      </div>
                      <div className="flex gap-6 text-sm text-gray-600">
                        <div>
                          <span className="text-gray-500">Type:</span>{" "}
                          {project.type}
                        </div>
                        <div>
                          <span className="text-gray-500">GHG Reduction:</span>{" "}
                          {project.ghgReduction}
                        </div>
                        <div>
                          <span className="text-gray-500">Project Cost:</span>{" "}
                          {project.projectCost}
                        </div>
                        <div>
                          <span className="text-gray-500">
                            Estimated Incentives:
                          </span>{" "}
                          {project.estIncentives}
                        </div>
                        <div>
                          <span className="text-gray-500">Annual Savings:</span>{" "}
                          {project.annualSavings}
                        </div>
                        <div>
                          <span className="text-gray-500">kWh Savings:</span>{" "}
                          {project.kwhSavings}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          ) : (
            <p className="text-gray-500">
              No active projects for this building.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

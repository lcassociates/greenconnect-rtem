// app/components/ActiveProjects.tsx (path example)

import { Card } from "../ui/card";
import { Badge } from "../ui/badge";
import { Star, CheckCircle2 } from "lucide-react";

import {
  activeProjectsByProperty,
  buildingData,
  ActiveProjectsProps,
} from "../../data/projects";


export function ActiveProjects({
  clientId,
}: ActiveProjectsProps) {
  const isScore = (score: number) => score < 4.53;
  const isCompliant = (year: number) => year < 2025;

  const getStatusColor = (status: string) => {
    switch (status) {
      case "04 App Sent to Customer - Waiting for Signature":
        return "bg-blue-100 text-blue-800";
      case "00 In Progress - Sign LCA Form if applicable":
        return "bg-blue-100 text-blue-800";
      case "08 PIOL Received - Needs Signature":
        return "bg-yellow-100 text-yellow-800";
      case "10 Under Implementation":
        return "bg-yellow-100 text-yellow-800";
      case "15 Post Inspection Complete - Awaiting Payment":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="p-8">
      <h2 className="mb-6 text-gray-900">
        Active Projects by Property
      </h2>

      <div className="space-y-6">
        {activeProjectsByProperty.map((property, idx) => {
          const building = buildingData[property.property];
          
          return (
            <div key={idx} className="flex gap-6">
              {/* Left Side - Building Card */}
              {building && (
                <div className="w-80 flex-shrink-0">
                  <Card className="overflow-hidden">
                    <div className="aspect-video w-full overflow-hidden">
                      <img
                        src={building.image}
                        alt={building.title}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    <div className="p-4">
                      <h4 className="text-gray-900 mb-1">
                        {building.title}
                      </h4>
                      <p className="text-sm text-gray-600 mb-4">
                        {building.subtitle}
                      </p>

                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Star
                              className="w-4 h-4 text-yellow-500"
                              fill="currentColor"
                            />
                            <span className="text-sm text-gray-600">
                              Energy Star:
                            </span>
                          </div>
                          <span className="text-gray-900">
                            {building.energyStar}
                          </span>
                        </div>

                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-600">
                            LL97 Score:
                          </span>
                          <span
                            className={`${isScore(building.ll97Score) ? "text-green-600" : "text-red-600"}`}
                          >
                            {building.ll97Score}
                          </span>
                        </div>

                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-600">
                            Compliance:
                          </span>
                          <div className="flex items-center gap-1">
                            {isCompliant(building.compliance) ? (
                              <CheckCircle2 className="w-4 h-4 text-green-600" />
                            ) : (
                              ""
                            )}
                            <span className="text-gray-900">
                              {building.compliance}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Card>
                </div>
              )}

              {/* Right Side - Projects List */}
              <div className="flex-1">
                <Card className="p-6">
                  <h3 className="mb-4 text-gray-900">
                    Property: {property.property}
                  </h3>

                  <div className="space-y-4">
                    {property.projects.map((project, pIdx) => (
                      <div
                        key={pIdx}
                        className="flex items-start justify-between p-4 bg-gray-50 rounded-lg"
                      >
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <p className="text-gray-900">
                              {project.name}
                            </p>
                            <Badge
                              className={getStatusColor(
                                project.status,
                              )}
                            >
                              {project.status}
                            </Badge>
                          </div>
                          <div className="flex gap-6 text-sm text-gray-600">
                            <div>
                              <span className="text-gray-500">
                                Type:
                              </span>{" "}
                              {project.type}
                            </div>
                            <div>
                              <span className="text-gray-500">
                                GHG Reduction:
                              </span>{" "}
                              {project.ghgReduction}
                            </div>
                            <div>
                              <span className="text-gray-500">
                                Project Cost:
                              </span>{" "}
                              {project.projectCost}
                            </div>
                            <div>
                              <span className="text-gray-500">
                                Estimated Incentives:
                              </span>{" "}
                              {project.estIncentives}
                            </div>
                            <div>
                              <span className="text-gray-500">
                                Annual Savings:
                              </span>{" "}
                              {project.annualSavings}
                            </div>
                            <div>
                              <span className="text-gray-500">
                                kWh Savings:
                              </span>{" "}
                              {project.kwhSavings}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

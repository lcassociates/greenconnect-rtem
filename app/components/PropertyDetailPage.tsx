"use client";

import { useState, useEffect } from "react";
import { ArrowLeft } from "lucide-react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import {
  subMeteringData,
  buildingData,
  activeProjectsData,
  dobComplianceData,
  energyProcurementData,
  equipmentSchedulesData,
} from "../data/propertyDetailData";

interface PropertyDetailPageProps {
  buildingName: string;
  clientId: string;
  onBack: () => void;
  onNavigateToSubMetering?: () => void;
  onNavigateToActiveProjects?: () => void;
  onNavigateToDOBCompliance?: () => void;
  onNavigateToEnergyProcurement?: () => void;
  onNavigateToEquipmentSchedules?: () => void;
}

type ViewType =
  | "sub-metering"
  | "active-projects"
  | "dob-compliance"
  | "energy-procurement"
  | "equipment-schedules";

export function PropertyDetailPage({
  buildingName,
  clientId,
  onBack,
  onNavigateToSubMetering,
  onNavigateToActiveProjects,
  onNavigateToDOBCompliance,
  onNavigateToEnergyProcurement,
  onNavigateToEquipmentSchedules,
}: PropertyDetailPageProps) {
  const [activeView, setActiveView] = useState<ViewType>("sub-metering");

  // Reset to initial state whenever buildingName changes
  useEffect(() => {
    setActiveView("sub-metering");
  }, [buildingName]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Completed":
        return "bg-green-100 text-green-800";
      case "In Progress":
        return "bg-blue-100 text-blue-800";
      case "Not Started":
        return "bg-orange-100 text-orange-800";
      case "Planning":
        return "bg-purple-100 text-purple-800";
      case "Yes":
        return "bg-red-100 text-red-800";
      case "No":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const subMetering =
    subMeteringData[buildingName as keyof typeof subMeteringData];
  const activeProjects =
    activeProjectsData[buildingName as keyof typeof activeProjectsData];
  const dobCompliance =
    dobComplianceData[buildingName as keyof typeof dobComplianceData] || [];
  const equipmentSchedules =
    equipmentSchedulesData[
      buildingName as keyof typeof equipmentSchedulesData
    ] || [];
  const building = buildingData[buildingName as keyof typeof buildingData];

  const energyProcurement =
    energyProcurementData[
      buildingName as keyof typeof energyProcurementData
    ];

  let daysLeft = 0;
  let percentElapsed = 0;
  let formattedEndDate = "";
  let formattedStartDate = "";

  if (energyProcurement) {
    const today = new Date();
    const start = new Date(energyProcurement.startDate);
    const end = new Date(energyProcurement.endDate);
    const msInDay = 1000 * 60 * 60 * 24;

    const totalDays = Math.max(
      1,
      Math.ceil((end.getTime() - start.getTime()) / msInDay),
    );
    const elapsedDays = Math.min(
      totalDays,
      Math.max(
        0,
        Math.ceil((today.getTime() - start.getTime()) / msInDay),
      ),
    );

    percentElapsed = (elapsedDays / totalDays) * 100;

    daysLeft = Math.max(
      0,
      Math.ceil((end.getTime() - today.getTime()) / msInDay),
    );

    formattedStartDate = start.toLocaleDateString(undefined, {
      month: "short",
      day: "numeric",
      year: "numeric",
    });

    formattedEndDate = end.toLocaleDateString(undefined, {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  }

  const countdownBg =
    daysLeft <= 30
      ? "bg-red-600"
      : daysLeft <= 60
        ? "bg-amber-500"
        : "bg-slate-900";

  return (
    <div className="h-full flex flex-col">
      <div className="bg-white border-b border-gray-200 px-8 py-6">
        <div className="flex items-center justify-between mb-6">
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
          </div>
        </div>

        {/* Card-based navigation */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {/* Sub-Metering Card */}
          <Card
            className={`overflow-hidden cursor-pointer transition-all hover:shadow-lg ${
              activeView === "sub-metering"
                ? "ring-2 ring-blue-500 shadow-md"
                : ""
            }`}
            onClick={() => {
              setActiveView("sub-metering");
              if (onNavigateToSubMetering) {
                onNavigateToSubMetering();
              }
            }}
          >
            <div className="aspect-video w-full overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1662601619308-3cd3038944b4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbGVjdHJpYyUyMG1ldGVyJTIwbW9uaXRvcmluZ3xlbnwxfHx8fDE3NjQxNzEwNjB8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="Sub-Metering"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-3">
              <p className="text-sm text-gray-900 mb-2 font-bold">
                Sub-Metering
              </p>
              {subMetering && (
                <>
                  <Badge
                    className={`${getStatusColor(
                      subMetering.status,
                    )} text-xs mb-2`}
                  >
                    {subMetering.status}
                  </Badge>
                  <p className="text-xs text-gray-600">
                    Meter Online: {subMetering.metersInstalled}/
                    {subMetering.totalMeters}
                  </p>
                </>
              )}
              {!subMetering && (
                <p className="text-xs text-gray-600">
                  No meter data
                </p>
              )}
            </div>
          </Card>

          {/* Active Projects Card */}
          <Card
            className={`overflow-hidden cursor-pointer transition-all hover:shadow-lg ${
              activeView === "active-projects"
                ? "ring-2 ring-blue-500 shadow-md"
                : ""
            }`}
            onClick={() => {
              setActiveView("active-projects");
              if (onNavigateToActiveProjects) {
                onNavigateToActiveProjects();
              }
            }}
          >
            <div className="aspect-video w-full overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1632862378913-b4fe820ce73b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb25zdHJ1Y3Rpb24lMjB3b3JrZXJzJTIwYnVpbGRpbmclMjBzaXRlfGVufDF8fHx8MTc2NDE3ODk5NXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="Active Projects"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-3">
              <p className="text-sm text-gray-900 mb-2 font-bold">
                Active Projects
              </p>
              {activeProjects && (
                <>
                  <Badge
                    className={`${getStatusColor(
                      activeProjects.status,
                    )} text-xs mb-2`}
                  >
                    {activeProjects.status}
                  </Badge>
                  <p className="text-xs text-gray-600">
                    Completion: {activeProjects.completedProjects}/
                    {activeProjects.totalProjects}
                  </p>
                  <p className="text-xs text-gray-600 mt-1">
                    Projected Annual Savings: $
                    {(() => {
                      const total =
                        activeProjects.projects.reduce(
                          (sum, project) => {
                            const amount = parseFloat(
                              project.annualSavings.replace(
                                /[$,]/g,
                                "",
                              ),
                            );
                            return sum + amount;
                          },
                          0,
                        );
                      return total >= 1000
                        ? `${(total / 1000).toFixed(1)}k`
                        : total.toLocaleString();
                    })()}
                  </p>
                </>
              )}
              {!activeProjects && (
                <p className="text-xs text-gray-600">
                  No project items
                </p>
              )}
            </div>
          </Card>

          {/* DOB Compliance Card */}
          <Card
            className={`overflow-hidden cursor-pointer transition-all hover:shadow-lg ${
              activeView === "dob-compliance"
                ? "ring-2 ring-blue-500 shadow-md"
                : ""
            }`}
            onClick={() => {
              setActiveView("dob-compliance");
              if (onNavigateToDOBCompliance) {
                onNavigateToDOBCompliance();
              }
            }}
          >
            <div className="aspect-video w-full overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1583521214690-73421a1829a9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidWlsZGluZyUyMGNvbXBsaWFuY2UlMjBkb2N1bWVudHN8ZW58MXx8fHwxNzY0MTcxNzIxfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="DOB Compliance"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-3">
              <p className="text-sm text-gray-900 mb-2 font-bold">
                DOB Compliance
              </p>
              {dobCompliance.length > 0 && (
                <>
                  <Badge
                    className={`${
                      dobCompliance.filter(
                        (item) => item.status === "Completed",
                      ).length === dobCompliance.length
                        ? "bg-green-100 text-green-800"
                        : "bg-blue-100 text-blue-800"
                    } text-xs mb-2`}
                  >
                    {dobCompliance.filter(
                      (item) => item.status === "Completed",
                    ).length === dobCompliance.length
                      ? "All Complete"
                      : "In Progress"}
                  </Badge>
                  <p className="text-xs text-gray-600">
                    Completion:{" "}
                    {
                      dobCompliance.filter(
                        (item) => item.status === "Completed",
                      ).length
                    }
                    /{dobCompliance.length}
                  </p>
                </>
              )}
              {dobCompliance.length === 0 && (
                <p className="text-xs text-gray-600">
                  No compliance items
                </p>
              )}
            </div>
          </Card>

          {/* Energy Procurement Card */}
          <Card
            className={`overflow-hidden cursor-pointer transition-all hover:shadow-lg ${
              activeView === "energy-procurement"
                ? "ring-2 ring-blue-500 shadow-md"
                : ""
            }`}
            onClick={() => {
              setActiveView("energy-procurement");
              if (onNavigateToEnergyProcurement) {
                onNavigateToEnergyProcurement();
              }
            }}
          >
            <div className="aspect-video w-full overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1523820818278-f1a7f789dbbf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxOWUMlMjBidWlsZGluZ3MlMjBuaWdodCUyMGxpZ2h0c3xlbnwxfHx8fDE3NjQxNzkyMDB8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="Energy Procurement"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-3">
              <p className="text-sm text-gray-900 mb-2 font-bold">
                Energy Procurement
              </p>
              {energyProcurement && (
                <>
                  <Badge
                    className={`${
                      daysLeft <= 30
                        ? "bg-red-100 text-red-800"
                        : daysLeft <= 60
                          ? "bg-orange-100 text-orange-800"
                          : "bg-green-100 text-green-800"
                    } text-xs mb-2`}
                  >
                    {daysLeft <= 30
                      ? "Expiring Soon"
                      : daysLeft <= 60
                        ? "Renew Soon"
                        : "Active"}
                  </Badge>
                  <p className="text-xs text-gray-600">
                    Supplier: {energyProcurement.provider}
                  </p>
                  <p className="text-xs text-gray-600 mt-1">
                    Time Remaining : {daysLeft} days left
                  </p>
                </>
              )}
              {!energyProcurement && (
                <p className="text-xs text-gray-600">
                  No contract
                </p>
              )}
            </div>
          </Card>

          {/* Equipment Schedules Card */}
          <Card
            className={`overflow-hidden cursor-pointer transition-all hover:shadow-lg ${
              activeView === "equipment-schedules"
                ? "ring-2 ring-blue-500 shadow-md"
                : ""
            }`}
            onClick={() => {
              setActiveView("equipment-schedules");
              if (onNavigateToEquipmentSchedules) {
                onNavigateToEquipmentSchedules();
              }
            }}
          >
            <div className="aspect-video w-full overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1730824332118-80349f90300e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmR1c3RyaWFsJTIwY2hpbGxlciUyMHB1bXBzJTIwYmx1ZXxlbnwxfHx8fDE3NjQxNzgxNTl8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="Equipment Schedules"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-3">
              <p className="text-sm text-gray-900 font-bold">
                Equipment Schedules
              </p>
              {equipmentSchedules.length > 0 ? (
                <p className="text-xs text-gray-600 mt-1">
                  {equipmentSchedules.length}{" "}
                  {equipmentSchedules.length === 1
                    ? "item"
                    : "items"}
                </p>
              ) : (
                <p className="text-xs text-gray-600 mt-1">
                  No equipment items
                </p>
              )}
            </div>
          </Card>
        </div>
      </div>

    </div>
  );
}

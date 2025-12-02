"use client";

import { useState, useEffect } from "react";
import { ArrowLeft, ChevronRight } from "lucide-react";
import { Button } from "./ui/button";
import { ClientOverviewPage } from "./client-views/ClientOverviewPage";
import { LocalLaw84 } from "./client-views/compliance/LocalLaw84";
import { LocalLaw88Lighting } from "./client-views/compliance/LocalLaw88Lighting";
import { LocalLaw88Submetering } from "./client-views/compliance/LocalLaw88Submetering";
import { LocalLaw97 } from "./client-views/compliance/LocalLaw97";
import { ActiveProjects } from "./client-views/ActiveProjects";
import { PropertyList } from "./client-views/PropertyList";
import { SubmeteringPage } from "./property-views/SubmeteringPage"
import { ActiveProjectPage } from "./property-views/ActiveProjectPage"
import { ProcurementContract } from "./client-views/ProcurementContract";
import { PropertyDetailPage } from "./PropertyDetailPage";
import { DOBCompliancePage } from "./property-views/DOBCompliancePage";
import { EnergyProcurementPage } from "./property-views/EnergyProcurementPage";
import { EquipmentSchedulePage } from "./property-views/EquipmentSchedulePage";
import { clientNames } from "../data/clientNames";

interface GeneralOverviewPageProps {
  clientId: string;
  onBack: () => void;
}

type ViewType =
  | "overview"
  | "local-law-84"
  | "local-law-88-lighting"
  | "local-law-88-submetering"
  | "local-law-97"
  | "active-projects"
  | "property-list"
  | "procurement-contract";

type BuildingSectionType =
  | null
  | "sub-metering"
  | "active-projects"
  | "dob-compliance"
  | "energy-procurement"
  | "equipment-schedules";

export function GeneralOverviewPage({
  clientId,
  onBack,
}: GeneralOverviewPageProps) {
  const [activeView, setActiveView] = useState<ViewType>("active-projects");
  const [selectedBuilding, setSelectedBuilding] = useState<string | null>(
    null,
  );
  const [buildingSection, setBuildingSection] =
    useState<BuildingSectionType>(null);
  const [isOverviewExpanded, setIsOverviewExpanded] = useState(true);
  const [isLLComplianceExpanded, setIsLLComplianceExpanded] =
    useState(false);
  const [currentSection, setCurrentSection] = useState<
    "main" | "general-overview" | "property-list"
  >("general-overview");
  const [currentSubSection, setCurrentSubSection] = useState<
    "none" | "local-law-compliance"
  >("none");

  const clientName = clientNames[clientId] || "Client";

  // Reset to initial state whenever clientId changes
  useEffect(() => {
    setActiveView("overview");
    setSelectedBuilding(null);
    setBuildingSection(null);
    setIsOverviewExpanded(false);
    setIsLLComplianceExpanded(false);
    setCurrentSection("main");
    setCurrentSubSection("none");
  }, [clientId]);

  const handleBuildingSelect = (buildingName: string) => {
    setSelectedBuilding(buildingName);
    setBuildingSection(null);
  };

  const handleBackToClient = () => {
    setSelectedBuilding(null);
    setBuildingSection(null);
  };

  const handleBackToBuildingDetail = () => {
    setBuildingSection(null);
  };

  const handleBackClick = () => {
    if (currentSection === "main") {
      onBack();
    } else if (currentSubSection === "local-law-compliance") {
      // Go back from Local Law Compliance to General Overview
      setCurrentSubSection("none");
      setActiveView("overview");
    } else {
      setCurrentSection("main");
      setIsOverviewExpanded(false);
      setIsLLComplianceExpanded(false);
      setCurrentSubSection("none");
    }
  };

  const getBackButtonText = () => {
    if (currentSection === "main") {
      return "Back to Portfolio";
    }
    if (currentSubSection === "local-law-compliance") {
      return "Back to General Overview";
    }
    return "Back to General Overview";
  };

  // If a building is selected, delegate to building-level pages
  if (selectedBuilding) {
    if (buildingSection === "sub-metering") {
      return (
        <SubmeteringPage
          buildingName={selectedBuilding}
          clientId={clientId}
          onBack={handleBackToBuildingDetail}
        />
      );
    }
    if (buildingSection === "active-projects") {
      return (
        <ActiveProjectPage
          buildingName={selectedBuilding}
          clientId={clientId}
          onBack={handleBackToBuildingDetail}
        />
      );
    }
    if (buildingSection === "dob-compliance") {
      return (
        <DOBCompliancePage
          buildingName={selectedBuilding}
          clientId={clientId}
          onBack={handleBackToBuildingDetail}
        />
      );
    }
    if (buildingSection === "energy-procurement") {
      return (
        <EnergyProcurementPage
          buildingName={selectedBuilding}
          clientId={clientId}
          onBack={handleBackToBuildingDetail}
        />
      );
    }
    if (buildingSection === "equipment-schedules") {
      return (
        <EquipmentSchedulePage
          buildingName={selectedBuilding}
          clientId={clientId}
          onBack={handleBackToBuildingDetail}
        />
      );
    }

    return (
      <PropertyDetailPage
        buildingName={selectedBuilding}
        clientId={clientId}
        onBack={handleBackToClient}
        onNavigateToSubMetering={() =>
          setBuildingSection("sub-metering")
        }
        onNavigateToActiveProjects={() =>
          setBuildingSection("active-projects")
        }
        onNavigateToDOBCompliance={() =>
          setBuildingSection("dob-compliance")
        }
        onNavigateToEnergyProcurement={() =>
          setBuildingSection("energy-procurement")
        }
        onNavigateToEquipmentSchedules={() =>
          setBuildingSection("equipment-schedules")
        }
      />
    );
  }

  return (
    <div className="h-full flex flex-col">
      <div className="bg-white border-b border-gray-200 px-8 py-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleBackClick}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              {getBackButtonText()}
            </Button>
            <h1 className="text-gray-900 tracking-tight">
              {clientName}
            </h1>
            {currentSection === "general-overview" && (
              <span
                className="text-blue-600 cursor-pointer hover:underline transition-colors"
                onClick={() => {
                  setCurrentSubSection("none");
                  setActiveView("overview");
                }}
              >
                / General Overview
              </span>
            )}
            {currentSubSection === "local-law-compliance" && (
              <span
                className="text-blue-600 cursor-pointer hover:underline transition-colors"
                onClick={() => {
                  setCurrentSubSection("local-law-compliance");
                  setActiveView("local-law-84");
                }}
              >
                / Local Law Compliance
              </span>
            )}
            {currentSection === "property-list" && (
              <span
                className="text-blue-600 cursor-pointer hover:underline transition-colors"
                onClick={() => {
                  setCurrentSection("property-list");
                  setActiveView("property-list");
                }}
              >
                / Property List
              </span>
            )}
          </div>
        </div>

        <div className="flex flex-col gap-2">
          {/* Main navigation buttons */}
          <div className="flex gap-2 items-center">
            {currentSection === "main" && (
              <Button
                variant={"outline"}
                onClick={() => {
                  setCurrentSection("general-overview");
                  setIsOverviewExpanded(true);
                  setActiveView("overview");
                }}
                className="flex items-center gap-2"
              >
                <ChevronRight className="w-4 h-4" />
                General Overview
              </Button>
            )}
            {currentSection === "main" && (
              <Button
                variant={"outline"}
                onClick={() => {
                  setCurrentSection("property-list");
                  setActiveView("property-list");
                  setIsOverviewExpanded(false);
                }}
              >
                Property List
              </Button>
            )}
          </div>

          {/* General Overview sub-items */}
          {currentSection === "general-overview" &&
            isOverviewExpanded &&
            currentSubSection === "none" && (
              <div className="flex flex-col gap-2 ml-8">
                <div className="flex gap-2 items-center">
                  <Button
                    variant={
                      activeView === "active-projects"
                        ? "default"
                        : "outline"
                    }
                    size="sm"
                    onClick={() => {
                      setActiveView("active-projects");
                      setCurrentSubSection("none");
                    }}
                  >
                    Active Projects
                  </Button>
                  <Button
                    variant={"outline"}
                    size="sm"
                    onClick={() => {
                      setCurrentSubSection("local-law-compliance");
                      setActiveView("local-law-84");
                    }}
                    className="flex items-center gap-2"
                  >
                    <ChevronRight className="w-4 h-4" />
                    Local Law Compliance
                  </Button>
                  <Button
                    variant={
                      activeView === "procurement-contract"
                        ? "default"
                        : "outline"
                    }
                    size="sm"
                    onClick={() => {
                      setActiveView("procurement-contract");
                      setCurrentSubSection("none");
                    }}
                  >
                    Procurement Contract
                  </Button>
                </div>
              </div>
            )}

          {/* Local Law Compliance sub-buttons */}
          {currentSubSection === "local-law-compliance" && (
            <div className="flex gap-2 ml-8">
              <Button
                variant={
                  activeView === "local-law-84"
                    ? "default"
                    : "outline"
                }
                size="sm"
                onClick={() => setActiveView("local-law-84")}
              >
                Local Law 84
              </Button>
              <Button
                variant={
                  activeView === "local-law-88-lighting"
                    ? "default"
                    : "outline"
                }
                size="sm"
                onClick={() =>
                  setActiveView("local-law-88-lighting")
                }
              >
                Local Law 88-Lighting
              </Button>
              <Button
                variant={
                  activeView === "local-law-88-submetering"
                    ? "default"
                    : "outline"
                }
                size="sm"
                onClick={() =>
                  setActiveView("local-law-88-submetering")
                }
              >
                Local Law 88 - Submetering
              </Button>
              <Button
                variant={
                  activeView === "local-law-97"
                    ? "default"
                    : "outline"
                }
                size="sm"
                onClick={() => setActiveView("local-law-97")}
              >
                Local Law 97
              </Button>
            </div>
          )}
        </div>
      </div>

      <div className="flex-1 overflow-auto">
        {currentSection === "main" &&
          activeView === "overview" && (
            <ClientOverviewPage clientId={clientId} />
          )}
        {currentSection === "general-overview" &&
          activeView === "overview" && (
            <ClientOverviewPage clientId={clientId} />
          )}
        {activeView === "local-law-84" && (
          <LocalLaw84 clientId={clientId} />
        )}
        {activeView === "local-law-88-lighting" && (
          <LocalLaw88Lighting clientId={clientId} />
        )}
        {activeView === "local-law-88-submetering" && (
          <LocalLaw88Submetering clientId={clientId} />
        )}
        {activeView === "local-law-97" && (
          <LocalLaw97 clientId={clientId} />
        )}
        {activeView === "active-projects" && (
          <ActiveProjects clientId={clientId} />
        )}
        {activeView === "property-list" && (
          <PropertyList
            clientId={clientId}
            onBuildingSelect={handleBuildingSelect}
          />
        )}
        {activeView === "procurement-contract" && (
          <ProcurementContract clientId={clientId} />
        )}
      </div>
    </div>
  );
}

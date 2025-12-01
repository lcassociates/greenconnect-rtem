"use client";

import { useState } from "react";
import { Card } from "../../ui/card";
import {
  Building2,
  CheckCircle2,
  Activity,
  AlertCircle,
  Filter,
  Search,
  ChevronUp,
  ChevronDown,
  PlayCircle,
  Info,
  MinusCircle,
  FileText,
  ExternalLink,
} from "lucide-react";
import { Badge } from "../../ui/badge";
import { Button } from "../../ui/button";
import { Input } from "../../ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
  DropdownMenuTrigger,
} from "../../ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../ui/table";
import {
  LL88LightingData,
  type LL88LightingRow,
} from "../../../data/ll88Lighting";

export interface LocalLaw88LightingProps {
  clientId: string;
}

type SortableLL88LightingKey = keyof LL88LightingRow; // "building" | "status" | "compliance"

export function LocalLaw88Lighting({
  clientId,
}: LocalLaw88LightingProps) {
  const [selectedBuildings, setSelectedBuildings] = useState<
    string[]
  >(LL88LightingData.map((b) => b.building));
  const [searchTerm, setSearchTerm] = useState("");
  const [sortColumn, setSortColumn] = useState<SortableLL88LightingKey | null>(
    null,
  );
  const [sortDirection, setSortDirection] = useState<
    "asc" | "desc"
  >("asc");

  // Status filtering
  const allStatuses = [
    "Completed",
    "In Progress",
    "Not Started",
    "Exempt",
    "Due",
  ];
  const [selectedStatuses, setSelectedStatuses] =
    useState<string[]>(allStatuses);

  const uniqueBuildings = Array.from(
    new Set(LL88LightingData.map((b) => b.building)),
  );

  // Filter buildings based on search term
  const filteredUniqueBuildings = uniqueBuildings.filter(
    (building) =>
      building.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const toggleBuilding = (building: string) => {
    setSelectedBuildings((prev) =>
      prev.includes(building)
        ? prev.filter((b) => b !== building)
        : [...prev, building],
    );
  };

  const toggleAll = () => {
    if (selectedBuildings.length === uniqueBuildings.length) {
      setSelectedBuildings([]);
    } else {
      setSelectedBuildings(uniqueBuildings);
    }
  };

  const toggleStatus = (status: string) => {
    setSelectedStatuses((prev) =>
      prev.includes(status)
        ? prev.filter((s) => s !== status)
        : [...prev, status],
    );
  };

  const toggleAllStatuses = () => {
    if (selectedStatuses.length === allStatuses.length) {
      setSelectedStatuses([]);
    } else {
      setSelectedStatuses(allStatuses);
    }
  };

  // Clear all filters
  const clearFilters = () => {
    setSelectedBuildings(uniqueBuildings);
    setSearchTerm("");
    setSelectedStatuses(allStatuses);
  };

  const filteredData = LL88LightingData.filter(
    (b) =>
      selectedBuildings.includes(b.building) &&
      selectedStatuses.includes(b.status),
  );

  const totalBuildings = filteredData.length;
  const completedBuildings = filteredData.filter(
    (b) => b.status === "Completed",
  ).length;
  const inProgress = filteredData.filter(
    (b) => b.status === "In Progress",
  ).length;
  const notStarted = filteredData.filter(
    (b) => b.status === "Not Started",
  ).length;
  const exempt = filteredData.filter(
    (b) => b.status === "Exempt",
  ).length;
  const atRisk = filteredData.filter(
    (b) => b.status === "Due",
  ).length;

  const stats = [
    {
      label: "Total Buildings",
      value: totalBuildings.toString(),
      icon: Building2,
      color: "text-blue-600",
      status: "all",
    },
    {
      label: "Completed",
      value: completedBuildings.toString(),
      icon: CheckCircle2,
      color: "text-green-600",
      status: "Completed",
    },
    {
      label: "In Progress",
      value: inProgress.toString(),
      icon: Activity,
      color: "text-blue-600",
      status: "In Progress",
    },
    {
      label: "Not Started",
      value: notStarted.toString(),
      icon: PlayCircle,
      color: "text-orange-600",
      status: "Not Started",
    },
    {
      label: "Due",
      value: atRisk.toString(),
      icon: AlertCircle,
      color: "text-red-600",
      status: "Due",
    },
    {
      label: "Exempt",
      value: exempt.toString(),
      icon: MinusCircle,
      color: "text-gray-600",
      status: "Exempt",
    },
  ];

  const handleCardClick = (status: string) => {
    if (status === "all") {
      // Show all statuses
      setSelectedStatuses(allStatuses);
    } else {
      // Filter to show only this status
      setSelectedStatuses([status]);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Completed":
        return "bg-green-100 text-green-800";
      case "In Progress":
        return "bg-blue-100 text-blue-800";
      case "Not Started":
        return "bg-orange-100 text-orange-800";
      case "Exempt":
        return "bg-gray-100 text-gray-800";
      case "Due":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const handleSort = (column: string) => {
    if (sortColumn === column) {
      setSortDirection(
        sortDirection === "asc" ? "desc" : "asc",
      );
    } else {
      setSortColumn(column);
      setSortDirection("asc");
    }
  };

  const sortedData = [...filteredData].sort((a, b) => {
    if (!sortColumn) return 0;

    // Handle different data types
    let aValue: any = a[sortColumn];
    let bValue: any = b[sortColumn];

    // For numeric comparisons
    if (sortColumn === "upgradeYear") {
      if (aValue < bValue)
        return sortDirection === "asc" ? -1 : 1;
      if (aValue > bValue)
        return sortDirection === "asc" ? 1 : -1;
      return 0;
    }

    // For savings (string with commas and units)
    if (sortColumn === "savings") {
      const aNum = parseInt(aValue.replace(/[^0-9]/g, ""));
      const bNum = parseInt(bValue.replace(/[^0-9]/g, ""));
      if (aNum < bNum) return sortDirection === "asc" ? -1 : 1;
      if (aNum > bNum) return sortDirection === "asc" ? 1 : -1;
      return 0;
    }

    // For strings (building, status)
    if (aValue < bValue)
      return sortDirection === "asc" ? -1 : 1;
    if (aValue > bValue)
      return sortDirection === "asc" ? 1 : -1;
    return 0;
  });

  // Calculate total estimated savings
  const totalSavings = sortedData.reduce((sum, building) => {
    const savingsNum = parseInt(
      building.savings.replace(/[^0-9]/g, ""),
    );
    return sum + savingsNum;
  }, 0);

  // Calculate total cost savings
  const totalCostSavings = sortedData.reduce(
    (sum, building) => {
      const costNum = parseInt(
        building.costSavings.replace(/[^0-9]/g, ""),
      );
      return sum + costNum;
    },
    0,
  );

  return (
    <div className="p-8">
      <h2 className="mb-6 text-gray-900">
        Local Law 88 - Lighting Upgrades
      </h2>

      {/* About Local Law 88 - Lighting Card */}
      <Card className="mb-6 border-l-4 border-l-blue-500 bg-blue-50/50 border-blue-200">
        <div className="p-6">
          <div className="flex items-start gap-3">
            <FileText className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
            <div className="flex-1">
              <p className="text-sm text-gray-600 leading-relaxed">
                Buildings (&gt; 25,000 ft²) required by the
                City’s lighting rules must upgrade outdated
                lighting so all required areas meet current NYC
                energy-efficient lighting standards. Building
                owners need to replace older fixtures and
                install the necessary lighting controls to
                comply.{" "}
                <a
                  href="https://www.nyc.gov/site/buildings/codes/ll88-lighting-system-upgrades-sub-meter-installation.page"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-700 inline-flex items-center gap-1 hover:underline"
                >
                  View Official NYC DOB Info
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </p>
            </div>
          </div>
        </div>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-6">
        {stats.map((stat, idx) => {
          const Icon = stat.icon;
          const bgColorMap: { [key: string]: string } = {
            "text-blue-600": "bg-blue-50",
            "text-green-600": "bg-green-50",
            "text-orange-600": "bg-orange-50",
            "text-purple-600": "bg-purple-50",
            "text-yellow-600": "bg-yellow-50",
            "text-red-600": "bg-red-50",
            "text-gray-600": "bg-gray-50",
          };
          const bgColor = bgColorMap[stat.color] || "bg-white";

          // Check if this card's status is currently selected
          const isActive =
            stat.status === "all"
              ? selectedStatuses.length === allStatuses.length
              : selectedStatuses.length === 1 &&
                selectedStatuses.includes(stat.status);

          return (
            <Card
              key={idx}
              className={`p-6 ${bgColor} cursor-pointer transition-all duration-200 hover:shadow-lg hover:scale-105 hover:-translate-y-1 ${
                isActive ? "ring-2 ring-blue-500 shadow-lg" : ""
              }`}
              onClick={() => handleCardClick(stat.status)}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <p className="text-sm text-gray-600 mb-2">
                    {stat.label}
                  </p>
                  <p className="text-gray-900">{stat.value}</p>
                </div>
                <Icon className={`w-8 h-8 ${stat.color}`} />
              </div>
            </Card>
          );
        })}
      </div>
      {/* Building Details Table */}
      <div className="mt-8">
        <Card className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-gray-900">
              Lighting Upgrade Status by Property
            </h3>
            <div className="flex gap-2">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    className="flex items-center gap-2"
                  >
                    <Filter className="w-4 h-4" />
                    Filter Buildings ({selectedBuildings.length}
                    )
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  align="end"
                  className="w-64"
                >
                  {/* Search Input */}
                  <div className="p-2 border-b">
                    <div className="relative">
                      <Search className="absolute left-2 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <Input
                        placeholder="Search buildings..."
                        value={searchTerm}
                        onChange={(e) =>
                          setSearchTerm(e.target.value)
                        }
                        className="pl-8"
                      />
                    </div>
                  </div>

                  {/* Select All Checkbox */}
                  <DropdownMenuCheckboxItem
                    checked={
                      selectedBuildings.length ===
                      uniqueBuildings.length
                    }
                    onCheckedChange={toggleAll}
                  >
                    All Buildings
                  </DropdownMenuCheckboxItem>

                  {/* Filtered Building List */}
                  <div className="max-h-64 overflow-y-auto">
                    {filteredUniqueBuildings.length > 0 ? (
                      filteredUniqueBuildings.map(
                        (building) => (
                          <DropdownMenuCheckboxItem
                            key={building}
                            checked={selectedBuildings.includes(
                              building,
                            )}
                            onCheckedChange={() =>
                              toggleBuilding(building)
                            }
                          >
                            {building}
                          </DropdownMenuCheckboxItem>
                        ),
                      )
                    ) : (
                      <div className="p-2 text-sm text-gray-500 text-center">
                        No buildings found
                      </div>
                    )}
                  </div>

                  {/* Clear Filters Button */}
                  <div className="p-2 border-t">
                    <Button
                      variant="outline"
                      className="w-full"
                      onClick={clearFilters}
                    >
                      Clear All Filters
                    </Button>
                  </div>
                </DropdownMenuContent>
              </DropdownMenu>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    className="flex items-center gap-2"
                  >
                    <Filter className="w-4 h-4" />
                    Filter Status ({selectedStatuses.length})
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  align="end"
                  className="w-56"
                >
                  {/* Select All Statuses Checkbox */}
                  <DropdownMenuCheckboxItem
                    checked={
                      selectedStatuses.length ===
                      allStatuses.length
                    }
                    onCheckedChange={toggleAllStatuses}
                  >
                    All Statuses
                  </DropdownMenuCheckboxItem>

                  {/* Status List */}
                  <div className="max-h-64 overflow-y-auto">
                    {allStatuses.map((status) => (
                      <DropdownMenuCheckboxItem
                        key={status}
                        checked={selectedStatuses.includes(
                          status,
                        )}
                        onCheckedChange={() =>
                          toggleStatus(status)
                        }
                      >
                        <Badge
                          className={getStatusColor(status)}
                        >
                          {status}
                        </Badge>
                      </DropdownMenuCheckboxItem>
                    ))}
                  </div>

                  {/* Clear Filters Button */}
                  <div className="p-2 border-t">
                    <Button
                      variant="outline"
                      className="w-full"
                      onClick={clearFilters}
                    >
                      Clear All Filters
                    </Button>
                  </div>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead
                    className="cursor-pointer"
                    onClick={() => handleSort("building")}
                  >
                    <div className="flex items-center gap-2">
                      <span>Building</span>
                      {sortColumn === "building" ? (
                        sortDirection === "asc" ? (
                          <ChevronUp className="w-4 h-4" />
                        ) : (
                          <ChevronDown className="w-4 h-4" />
                        )
                      ) : (
                        <ChevronUp className="w-4 h-4 text-gray-300" />
                      )}
                    </div>
                  </TableHead>
                  <TableHead
                    className="cursor-pointer"
                    onClick={() => handleSort("status")}
                  >
                    <div className="flex items-center gap-2">
                      <span>Status</span>
                      {sortColumn === "status" ? (
                        sortDirection === "asc" ? (
                          <ChevronUp className="w-4 h-4" />
                        ) : (
                          <ChevronDown className="w-4 h-4" />
                        )
                      ) : (
                        <ChevronUp className="w-4 h-4 text-gray-300" />
                      )}
                    </div>
                  </TableHead>
                  <TableHead
                    className="cursor-pointer"
                    onClick={() => handleSort("upgradeYear")}
                  >
                    <div className="flex items-center gap-2">
                      <span>Upgrade Year</span>
                      {sortColumn === "upgradeYear" ? (
                        sortDirection === "asc" ? (
                          <ChevronUp className="w-4 h-4" />
                        ) : (
                          <ChevronDown className="w-4 h-4" />
                        )
                      ) : (
                        <ChevronUp className="w-4 h-4 text-gray-300" />
                      )}
                    </div>
                  </TableHead>
                  <TableHead
                    className="cursor-pointer text-right"
                    onClick={() => handleSort("savings")}
                  >
                    <div className="flex items-center gap-2 justify-end">
                      <span>Projected Annual Savings</span>
                      {sortColumn === "savings" ? (
                        sortDirection === "asc" ? (
                          <ChevronUp className="w-4 h-4" />
                        ) : (
                          <ChevronDown className="w-4 h-4" />
                        )
                      ) : (
                        <ChevronUp className="w-4 h-4 text-gray-300" />
                      )}
                    </div>
                  </TableHead>
                  <TableHead className="text-right">
                    <span>Annual Cost Savings</span>
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {sortedData.map((building, idx) => (
                  <TableRow key={idx}>
                    <TableCell>{building.building}</TableCell>
                    <TableCell>
                      <Badge
                        className={getStatusColor(
                          building.status,
                        )}
                      >
                        {building.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {building.upgradeYear}
                    </TableCell>
                    <TableCell className="text-right">
                      {building.savings}
                    </TableCell>
                    <TableCell className="text-right">
                      {building.costSavings}
                    </TableCell>
                  </TableRow>
                ))}
                {/* Total Row */}
                <TableRow className="bg-gray-50 border-t-2">
                  <TableCell>
                    <strong>Total</strong>
                  </TableCell>
                  <TableCell>
                    <strong>-</strong>
                  </TableCell>
                  <TableCell>
                    <strong>-</strong>
                  </TableCell>
                  <TableCell className="text-right">
                    <strong>
                      {totalSavings.toLocaleString()} kWh/yr
                    </strong>
                  </TableCell>
                  <TableCell className="text-right">
                    <strong>
                      ${totalCostSavings.toLocaleString()}
                    </strong>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        </Card>
      </div>

      {/* Status Legend */}
      <div className="mt-6">
        <Card className="p-6 bg-blue-50 border-blue-200">
          <div className="flex items-start gap-3 mb-4">
            <Info className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
            <div className="flex-1">
              <h4 className="text-gray-900 mb-3">
                LL88 Lighting Status Reference
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="flex items-start gap-3">
                  <div className="flex items-center gap-2 min-w-fit">
                    <CheckCircle2 className="w-4 h-4 text-green-600" />
                    <Badge className="bg-green-100 text-green-800">
                      Completed
                    </Badge>
                  </div>
                  <span className="text-sm text-gray-600">
                    Lighting upgrades done, compliant
                  </span>
                </div>

                <div className="flex items-start gap-3">
                  <div className="flex items-center gap-2 min-w-fit">
                    <Activity className="w-4 h-4 text-blue-600" />
                    <Badge className="bg-blue-100 text-blue-800">
                      In Progress
                    </Badge>
                  </div>
                  <span className="text-sm text-gray-600">
                    Work started but not fully complete
                  </span>
                </div>

                <div className="flex items-start gap-3">
                  <div className="flex items-center gap-2 min-w-fit">
                    <PlayCircle className="w-4 h-4 text-orange-600" />
                    <Badge className="bg-orange-100 text-orange-800">
                      Not Started
                    </Badge>
                  </div>
                  <span className="text-sm text-gray-600">
                    No LL88 lighting project yet
                  </span>
                </div>

                <div className="flex items-start gap-3">
                  <div className="flex items-center gap-2 min-w-fit">
                    <AlertCircle className="w-4 h-4 text-red-600" />
                    <Badge className="bg-red-100 text-red-800">
                      Due
                    </Badge>
                  </div>
                  <span className="text-sm text-gray-600">
                    Close to deadline or past target date
                    without completion
                  </span>
                </div>

                <div className="flex items-start gap-3">
                  <div className="flex items-center gap-2 min-w-fit">
                    <MinusCircle className="w-4 h-4 text-gray-600" />
                    <Badge className="bg-gray-100 text-gray-800">
                      Exempt
                    </Badge>
                  </div>
                  <span className="text-sm text-gray-600">
                    Not a covered building / area under LL88
                  </span>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
"use client";

import { useState } from "react";
import { Card } from "../../ui/card";
import {
  Building2,
  CheckCircle2,
  AlertCircle,
  Activity,
  FileText,
  Filter,
  Search,
  ChevronUp,
  ChevronDown,
  Info,
  PlayCircle,
  MinusCircle,
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
import { ll84Data, type LL84Row } from "../../../data/ll84";

type SortableLL84Key = keyof LL84Row; // "building" | "status" | "compliance"

export interface LocalLaw84Props {
  clientId: string;
}

export function LocalLaw84({ clientId }: LocalLaw84Props) {
  const [selectedBuildings, setSelectedBuildings] = useState<string[]>(
    ll84Data.map((b) => b.building),
  );
  const [searchTerm, setSearchTerm] = useState("");
  const [sortColumn, setSortColumn] = useState<SortableLL84Key | null>(
    null,
  );
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">(
    "asc",
  );

  // Status filtering
  const allStatuses = [
    "Compliant",
    "In Progress",
    "Not Started",
    "Due",
    "Exempt",
  ];
  const [selectedStatuses, setSelectedStatuses] =
    useState<string[]>(allStatuses);

  const uniqueBuildings = Array.from(
    new Set(ll84Data.map((b) => b.building)),
  );

  // Filter buildings based on search term
  const filteredUniqueBuildings = uniqueBuildings.filter((building) =>
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

  const filteredData = ll84Data.filter(
    (b) =>
      selectedBuildings.includes(b.building) &&
      selectedStatuses.includes(b.status),
  );

  // Calculate stats from the full dataset (not filtered)
  const totalBuildings = ll84Data.length;
  const compliantBuildings = ll84Data.filter(
    (b) => b.status === "Compliant",
  ).length;
  const inProgressBuildings = ll84Data.filter(
    (b) => b.status === "In Progress",
  ).length;
  const lateBuildings = ll84Data.filter(
    (b) => b.status === "Due",
  ).length;
  const notSubmitted = ll84Data.filter(
    (b) => b.status === "Not Started",
  ).length;
  const exempt = ll84Data.filter(
    (b) => b.status === "Exempt",
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
      label: "Compliant",
      value: compliantBuildings.toString(),
      icon: CheckCircle2,
      color: "text-green-600",
      status: "Compliant",
    },
    {
      label: "In Progress",
      value: inProgressBuildings.toString(),
      icon: Activity,
      color: "text-blue-600",
      status: "In Progress",
    },
    {
      label: "Not Started",
      value: notSubmitted.toString(),
      icon: PlayCircle,
      color: "text-orange-600",
      status: "Not Started",
    },
    {
      label: "Due",
      value: lateBuildings.toString(),
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

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Compliant":
        return "bg-green-100 text-green-800";
      case "In Progress":
        return "bg-blue-100 text-blue-800";
      case "Due":
        return "bg-red-100 text-red-800";
      case "Not Started":
        return "bg-orange-100 text-orange-800";
      case "Exempt":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const handleCardClick = (status: string) => {
    if (status === "all") {
      // Show all statuses
      setSelectedStatuses(allStatuses);
    } else {
      // Filter to show only this status
      setSelectedStatuses([status]);
    }
  };

  const handleSort = (column: SortableLL84Key) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortColumn(column);
      setSortDirection("asc");
    }
  };

  const sortedData = [...filteredData].sort((a, b) => {
    if (!sortColumn) return 0;

    const aVal = a[sortColumn];
    const bVal = b[sortColumn];

    // numeric column
    if (sortColumn === "compliance") {
      const aNum = aVal as number;
      const bNum = bVal as number;
      return sortDirection === "asc" ? aNum - bNum : bNum - aNum;
    }

    // string columns (building, status)
    const aStr = String(aVal);
    const bStr = String(bVal);

    if (aStr < bStr) return sortDirection === "asc" ? -1 : 1;
    if (aStr > bStr) return sortDirection === "asc" ? 1 : -1;
    return 0;
  });

  return (
    <div className="p-8">
      <h2 className="mb-6 text-gray-900">
        Local Law 84 - Energy Benchmarking
      </h2>

      {/* About Local Law 84 Card */}
      <Card className="mb-6 border-l-4 border-l-blue-500 bg-blue-50/50 border-blue-200">
        <div className="p-6">
          <div className="flex items-start gap-3">
            <FileText className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
            <div className="flex-1">
              <p className="text-sm text-gray-600 leading-relaxed">
                Large NYC buildings (&gt; 25,000 ft²) are required to
                report their annual energy and water use through the
                ENERGY STAR Portfolio Manager system. Building owners
                must gather their utility data each year and submit it
                to the City by the required deadline.{" "}
                <a
                  href="https://www.nyc.gov/site/buildings/codes/benchmarking.page"
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
              Property List & LL84 Compliance
            </h3>
            <div className="flex gap-2">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    className="flex items-center gap-2"
                  >
                    <Filter className="w-4 h-4" />
                    Filter Buildings ({selectedBuildings.length})
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
                      filteredUniqueBuildings.map((building) => (
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
                      ))
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
                        <Badge className={getStatusColor(status)}>
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
                    onClick={() => handleSort("compliance")}
                  >
                    <div className="flex items-center gap-2 justify-end">
                      <span>LL84 Compliance Year</span>
                      {sortColumn === "compliance" ? (
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
                </TableRow>
              </TableHeader>
              <TableBody>
                {sortedData.map((building, idx) => (
                  <TableRow key={idx}>
                    <TableCell>{building.building}</TableCell>
                    <TableCell>
                      <Badge
                        className={getStatusColor(building.status)}
                      >
                        {building.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      {building.compliance}
                    </TableCell>
                  </TableRow>
                ))}
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
                LL84 Compliance Status Reference
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="flex items-start gap-3">
                  <div className="flex items-center gap-2 min-w-fit">
                    <CheckCircle2 className="w-4 h-4 text-green-600" />
                    <Badge className="bg-green-100 text-green-800">
                      Compliant
                    </Badge>
                  </div>
                  <span className="text-sm text-gray-600">
                    Fully met LL84 reporting requirements
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
                    No filing was made
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
                    Filed but after the deadline
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
                    Building not required to file
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

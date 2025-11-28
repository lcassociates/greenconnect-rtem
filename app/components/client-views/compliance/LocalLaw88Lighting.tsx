"use client";

import { useState } from "react";
import { Card } from "../../ui/card";
import {
  Building2,
  CheckCircle2,
  Activity,
  AlertCircle,
  Lightbulb,
  Filter,
  Search,
  ChevronUp,
  ChevronDown,
  PlayCircle,
  XCircle,
  Info,
  MinusCircle,
  ShieldCheck,
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
  ll88LightingData,
  LL88LightingRow,
} from "../../../data/ll88Lighting";

export interface LocalLaw88LightingProps {
  clientId: string;
}

// limit sort keys to real keys on LL88LightingRow
type SortableLL88Key = keyof LL88LightingRow;

export function LocalLaw88Lighting({ clientId }: LocalLaw88LightingProps) {
  const uniqueBuildings = Array.from(
    new Set(ll88LightingData.map((b) => b.building))
  );

  const [selectedBuildings, setSelectedBuildings] = useState<string[]>(
    uniqueBuildings
  );
  const [searchTerm, setSearchTerm] = useState("");
  const [sortColumn, setSortColumn] = useState<SortableLL88Key | null>(null);
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");

  // Status filtering
  const allStatuses = ["Completed", "In Progress", "Not Started", "Exempt", "Due"];
  const [selectedStatuses, setSelectedStatuses] =
    useState<string[]>(allStatuses);

  const handleTagClick = (building: string) => {
    if (selectedBuildings.includes(building)) {
      setSelectedBuildings(selectedBuildings.filter((b) => b !== building));
    } else {
      setSelectedBuildings([...selectedBuildings, building]);
    }
  };

  const toggleAllBuildings = () => {
    if (selectedBuildings.length === uniqueBuildings.length) {
      setSelectedBuildings([]);
    } else {
      setSelectedBuildings(uniqueBuildings);
    }
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

  const filteredData: LL88LightingRow[] = ll88LightingData.filter(
    (b) =>
      selectedStatuses.includes(b.status) &&
      (selectedBuildings.length === 0 ||
        selectedBuildings.includes(b.building)) &&
      (searchTerm === "" ||
        b.building.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const totalBuildings = filteredData.length;
  const completedBuildings = filteredData.filter(
    (b) => b.status === "Completed"
  ).length;
  const inProgress = filteredData.filter(
    (b) => b.status === "In Progress"
  ).length;
  const notStarted = filteredData.filter(
    (b) => b.status === "Not Started"
  ).length;
  const exempt = filteredData.filter((b) => b.status === "Exempt").length;
  const atRisk = filteredData.filter((b) => b.status === "Due").length;

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
      setSelectedStatuses(allStatuses);
      return;
    }

    if (selectedStatuses.includes(status)) {
      setSelectedStatuses(selectedStatuses.filter((s) => s !== status));
    } else {
      setSelectedStatuses([...selectedStatuses, status]);
    }
  };

  const getStatusStyles = (status: string) => {
    switch (status) {
      case "Completed":
        return "bg-green-100 text-green-800 border border-green-200";
      case "In Progress":
        return "bg-blue-100 text-blue-800 border border-blue-200";
      case "Not Started":
        return "bg-orange-100 text-orange-800 border border-orange-200";
      case "Due":
        return "bg-red-100 text-red-800 border border-red-200 animate-pulse";
      case "Exempt":
        return "bg-gray-100 text-gray-800 border border-gray-200";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatBg = (status: string) => {
    switch (status) {
      case "Completed":
        return "bg-green-50 border-green-100";
      case "In Progress":
        return "bg-blue-50 border-blue-100";
      case "Not Started":
        return "bg-orange-50 border-orange-100";
      case "Due":
        return "bg-red-50 border-red-100";
      case "Exempt":
        return "bg-gray-50 border-gray-100";
      default:
        return "bg-gray-50 border-gray-100";
    }
  };

  const getBadgeVariant =
    (status: string) =>
    (baseClass = "px-2 py-1 text-xs font-medium rounded-full") => {
      switch (status) {
        case "Completed":
          return `${baseClass} bg-green-100 text-green-700 border border-green-200`;
        case "In Progress":
          return `${baseClass} bg-blue-100 text-blue-700 border border-blue-200`;
        case "Not Started":
          return `${baseClass} bg-orange-100 text-orange-700 border border-orange-200`;
        case "Due":
          return `${baseClass} bg-red-100 text-red-700 border border-red-200`;
        case "Exempt":
          return `${baseClass} bg-gray-100 text-gray-700 border border-gray-200`;
        default:
          return `${baseClass} bg-gray-100 text-gray-700 border border-gray-200`;
      }
    };

  const handleSort = (column: SortableLL88Key) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortColumn(column);
      setSortDirection("asc");
    }
  };

  const sortedData: LL88LightingRow[] = [...filteredData].sort(
    (a: LL88LightingRow, b: LL88LightingRow) => {
      if (!sortColumn) return 0;

      // Handle different data types
      let aValue: any = a[sortColumn];
      let bValue: any = b[sortColumn];

      // For numeric comparisons
      if (sortColumn === "upgradeYear") {
        if (aValue < bValue) return sortDirection === "asc" ? -1 : 1;
        if (aValue > bValue) return sortDirection === "asc" ? 1 : -1;
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

      // For costSavings (string with $, commas)
      if (sortColumn === "costSavings") {
        const aNum = parseInt(aValue.replace(/[^0-9]/g, ""));
        const bNum = parseInt(bValue.replace(/[^0-9]/g, ""));
        if (aNum < bNum) return sortDirection === "asc" ? -1 : 1;
        if (aNum > bNum) return sortDirection === "asc" ? 1 : -1;
        return 0;
      }

      // For strings (building, status)
      if (aValue < bValue) return sortDirection === "asc" ? -1 : 1;
      if (aValue > bValue) return sortDirection === "asc" ? 1 : -1;
      return 0;
    }
  );

  // Calculate total estimated savings
  const totalSavings = sortedData.reduce((sum, building) => {
    const savingsNum = parseInt(building.savings.replace(/[^0-9]/g, ""));
    return sum + savingsNum;
  }, 0);

  // Calculate total cost savings
  const totalCostSavings = sortedData.reduce((sum, building) => {
    const costNum = parseInt(building.costSavings.replace(/[^0-9]/g, ""));
    return sum + costNum;
  }, 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="space-y-2">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-amber-50 rounded-xl border border-amber-100">
            <Lightbulb className="w-6 h-6 text-amber-500" />
          </div>
          <div>
            <h1 className="text-xl font-semibold">
              Local Law 88 – Lighting Upgrades
            </h1>
            <p className="text-sm text-gray-600">
              Track lighting retrofit progress across your portfolio to meet NYC
              LL88 requirements.
            </p>
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-2 text-xs text-gray-500">
          <Badge variant="default" className="gap-1">
            <ShieldCheck className="w-3 h-3" />
            <span>Covered Buildings &amp; LL88 Areas</span>
          </Badge>
          <span>•</span>
          <span>
            Deadline:{" "}
            <span className="font-medium text-gray-700">
              December 31, 2025
            </span>
          </span>
          <span>•</span>
          <span>
            Lighting upgrades required for covered spaces and common areas in
            large commercial buildings.
          </span>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-6">
        {stats.map((stat) => (
          <Card
            key={stat.label}
            className={`p-3 cursor-pointer border transition-all hover:shadow-sm ${getStatBg(
              stat.status
            )} ${
              stat.status !== "all" &&
              selectedStatuses.includes(stat.status)
                ? "ring-1 ring-blue-500"
                : ""
            }`}
            onClick={() => handleCardClick(stat.status)}
          >
            <div className="flex items-center gap-2">
              <div
                className={`p-1.5 rounded-lg bg-white/70 ${stat.color}`}
              >
                <stat.icon className="w-4 h-4" />
              </div>
              <div className="text-right flex-1">
                <div className="text-xs text-gray-500">{stat.label}</div>
                <div className="text-lg font-semibold">{stat.value}</div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* LL88 Lighting Checklist */}
      <Card className="border border-amber-100 bg-amber-50/30">
        <div className="p-4 border-b border-amber-100 flex items-start justify-between gap-4">
          <div className="flex items-start gap-3">
            <div className="p-2 rounded-lg bg-amber-100">
              <FileText className="w-4 h-4 text-amber-700" />
            </div>
            <div className="space-y-1">
              <h2 className="text-sm font-semibold text-amber-900">
                LL88 Lighting Retrofit Checklist
              </h2>
              <p className="text-xs text-amber-900/80">
                These requirements only apply to covered buildings and
                LL88-covered areas. Exempt spaces and buildings are tracked
                separately.
              </p>
            </div>
          </div>
          <div className="flex flex-wrap gap-2 items-center">
            <Button
              variant="default"
              size="sm"
              className="gap-1 border-amber-200 text-amber-900 hover:bg-amber-100/50"
            >
              <ExternalLink className="w-3 h-3" />
              LL88 Reference
            </Button>
            <Button
              variant="default"
              size="sm"
              className="gap-1 border-amber-200 text-amber-900 hover:bg-amber-100/50"
            >
              <FileText className="w-3 h-3" />
              Sample Owner Letter
            </Button>
          </div>
        </div>
        <div className="p-4 grid gap-4 md:grid-cols-2 lg:grid-cols-4 text-xs text-amber-900/90">
          <div className="space-y-2">
            <div className="font-semibold text-amber-900">Covered Buildings</div>
            <ul className="space-y-1">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-3 h-3 mt-0.5 text-emerald-500" />
                <span>Non-residential buildings &gt; 50,000 gross sq ft</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-3 h-3 mt-0.5 text-emerald-500" />
                <span>
                  Multiple buildings on same tax lot &gt; 100,000 gross sq ft
                </span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-3 h-3 mt-0.5 text-emerald-500" />
                <span>
                  Multiple buildings held in condominium form &gt; 100,000 gross
                  sq ft
                </span>
              </li>
            </ul>
          </div>
          <div className="space-y-2">
            <div className="font-semibold text-amber-900">Covered Areas</div>
            <ul className="space-y-1">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-3 h-3 mt-0.5 text-emerald-500" />
                <span>Interior building common areas</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-3 h-3 mt-0.5 text-emerald-500" />
                <span>Tenant spaces &gt; 10,000 sq ft</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-3 h-3 mt-0.5 text-emerald-500" />
                <span>Certain exterior and parking areas, per code</span>
              </li>
            </ul>
          </div>
          <div className="space-y-2">
            <div className="font-semibold text-amber-900">Required Upgrades</div>
            <ul className="space-y-1">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-3 h-3 mt-0.5 text-emerald-500" />
                <span>
                  Replace existing lighting with fixtures meeting current NYC
                  Energy Code
                </span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-3 h-3 mt-0.5 text-emerald-500" />
                <span>
                  Install required lighting controls (occupancy, daylight, etc.)
                </span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-3 h-3 mt-0.5 text-emerald-500" />
                <span>
                  Document fixture counts, wattages, and control strategies
                </span>
              </li>
            </ul>
          </div>
          <div className="space-y-2">
            <div className="font-semibold text-amber-900">
              Exemptions &amp; Alternate Paths
            </div>
            <ul className="space-y-1">
              <li className="flex items-start gap-2">
                <Info className="w-3 h-3 mt-0.5 text-amber-600" />
                <span>
                  Historic spaces where upgrades are impractical or would damage
                  character
                </span>
              </li>
              <li className="flex items-start gap-2">
                <Info className="w-3 h-3 mt-0.5 text-amber-600" />
                <span>
                  Demonstrated compliance via alternate methods (e.g. recent gut
                  renovation)
                </span>
              </li>
              <li className="flex items-start gap-2">
                <Info className="w-3 h-3 mt-0.5 text-amber-600" />
                <span>
                  Buildings not meeting covered building thresholds (tracked as
                  &quot;Exempt&quot; below)
                </span>
              </li>
            </ul>
          </div>
        </div>
      </Card>

      {/* Filters and Table */}
      <div className="grid gap-4 lg:grid-cols-[2fr,3fr]">
        {/* Filters */}
        <Card className="p-4 border border-gray-200 bg-gray-50/50">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-gray-500" />
              <h2 className="font-medium text-sm">Filter Lighting Projects</h2>
            </div>
            <Button
              variant="ghost"
              size="sm"
              className="h-7 text-xs px-2 gap-1"
              onClick={clearFilters}
            >
              <XCircle className="w-3 h-3" />
              Clear
            </Button>
          </div>

          <div className="space-y-4 text-xs">
            {/* Search */}
            <div className="space-y-1.5">
              <label className="text-gray-600 text-xs font-medium">
                Search Buildings
              </label>
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 w-3.5 h-3.5 text-gray-400" />
                <Input
                  placeholder="Search by building name"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-8 h-8 text-xs"
                />
              </div>
            </div>

            {/* Building Filter */}
            <div className="space-y-1.5">
              <label className="text-gray-600 text-xs font-medium">
                Buildings
              </label>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="default"
                    size="sm"
                    className="w-full justify-between h-8 text-xs"
                  >
                    <span className="truncate">
                      {selectedBuildings.length === 0
                        ? "All buildings"
                        : `${selectedBuildings.length} selected`}
                    </span>
                    <ChevronDown className="w-3 h-3 ml-1" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-64 max-h-64 overflow-auto">
                  <div className="flex items-center justify-between px-2 py-1.5 border-b">
                    <span className="text-xs font-medium">Buildings</span>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-7 text-xs px-2"
                      onClick={toggleAllBuildings}
                    >
                      {selectedBuildings.length === uniqueBuildings.length
                        ? "Clear"
                        : "Select all"}
                    </Button>
                  </div>
                  {uniqueBuildings.map((building) => (
                    <DropdownMenuCheckboxItem
                      key={building}
                      checked={selectedBuildings.includes(building)}
                      onCheckedChange={() => handleTagClick(building)}
                      className="text-xs"
                    >
                      {building}
                    </DropdownMenuCheckboxItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            {/* Status Filter */}
            <div className="space-y-1.5">
              <label className="text-gray-600 text-xs font-medium">
                Project Status
              </label>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="default"
                    size="sm"
                    className="w-full justify-between h-8 text-xs"
                  >
                    <span className="truncate">
                      {selectedStatuses.length === allStatuses.length
                        ? "All statuses"
                        : `${selectedStatuses.length} selected`}
                    </span>
                    <ChevronDown className="w-3 h-3 ml-1" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-64">
                  <div className="flex items-center justify-between px-2 py-1.5 border-b">
                    <span className="text-xs font-medium">Status</span>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-7 text-xs px-2"
                      onClick={toggleAllStatuses}
                    >
                      {selectedStatuses.length === allStatuses.length
                        ? "Clear"
                        : "Select all"}
                    </Button>
                  </div>
                  {allStatuses.map((status) => (
                    <DropdownMenuCheckboxItem
                      key={status}
                      checked={selectedStatuses.includes(status)}
                      onCheckedChange={() => handleCardClick(status)}
                      className="text-xs"
                    >
                      {status}
                    </DropdownMenuCheckboxItem>
                  ))}
                  <div className="border-t mt-1 pt-1 px-2">
                    <Button
                      variant="default"
                      size="sm"
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
        </Card>

        {/* Table */}
        <Card className="border border-gray-200">
          <div className="p-3 border-b border-gray-100 flex items-center justify-between gap-2">
            <div>
              <h2 className="font-medium text-sm">Lighting Upgrade Status</h2>
              <p className="text-xs text-gray-500">
                LL88 lighting retrofit progress for each covered building.
              </p>
            </div>
            <div className="flex flex-col items-end text-xs text-gray-500">
              <div className="flex items-center gap-2">
                <span className="text-green-700 font-semibold">
                  {totalSavings.toLocaleString()} kWh
                </span>
                <span>estimated annual savings</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-emerald-700 font-semibold">
                  ${totalCostSavings.toLocaleString()}
                </span>
                <span>estimated annual cost savings</span>
              </div>
            </div>
          </div>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-gray-50/80">
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
                  <TableHead
                    className="cursor-pointer text-right"
                    onClick={() => handleSort("costSavings")}
                  >
                    <div className="flex items-center gap-2 justify-end">
                      <span>Annual Cost Savings</span>
                      {sortColumn === "costSavings" ? (
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
                {sortedData.map((building) => (
                  <TableRow key={building.building}>
                    <TableCell className="whitespace-nowrap">
                      <div className="flex flex-col">
                        <span className="font-medium text-sm">
                          {building.building}
                        </span>
                        <span className="text-xs text-gray-500">
                          LL88 covered building
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <span
                        className={getBadgeVariant(building.status)()}
                      >
                        {building.status}
                      </span>
                    </TableCell>
                    <TableCell className="text-sm">
                      {building.upgradeYear}
                    </TableCell>
                    <TableCell className="text-right text-sm">
                      {building.savings}
                    </TableCell>
                    <TableCell className="text-right text-sm">
                      {building.costSavings}
                    </TableCell>
                  </TableRow>
                ))}

                {sortedData.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center py-6">
                      <div className="flex flex-col items-center gap-2">
                        <Lightbulb className="w-6 h-6 text-gray-300" />
                        <div className="text-sm font-medium text-gray-700">
                          No lighting projects match your filters
                        </div>
                        <div className="text-xs text-gray-500 max-w-sm">
                          Try adjusting the building selection, status filters,
                          or search term to see LL88 lighting projects that meet
                          your criteria.
                        </div>
                      </div>
                    </TableCell>
                  </TableRow>
                )}

                {sortedData.length > 0 && (
                  <TableRow className="bg-gray-50/80">
                    <TableCell colSpan={3}>
                      <div className="flex items-center gap-2 text-xs text-gray-600">
                        <Info className="w-3 h-3" />
                        <span>
                          LL88 lighting upgrades for these buildings are
                          estimated to deliver the following portfolio-level
                          benefits:
                        </span>
                      </div>
                    </TableCell>
                    <TableCell className="text-right text-xs">
                      <div className="flex flex-col items-end">
                        <span className="text-gray-500">
                          Total energy savings
                        </span>
                        <strong>
                          {totalSavings.toLocaleString()} kWh/yr
                        </strong>
                      </div>
                    </TableCell>
                    <TableCell className="text-right text-xs">
                      <div className="flex flex-col items-end">
                        <span className="text-gray-500">
                          Total cost savings
                        </span>
                        <strong>
                          ${totalCostSavings.toLocaleString()}
                        </strong>
                      </div>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </Card>
      </div>

      {/* Exempt Buildings Note */}
      <div className="grid gap-4 lg:grid-cols-2">
        <Card className="border border-gray-200 bg-gray-50">
          <div className="p-4 flex items-start gap-3">
            <div className="p-2 rounded-lg bg-gray-200">
              <MinusCircle className="w-4 h-4 text-gray-700" />
            </div>
            <div className="space-y-1">
              <h2 className="font-medium text-sm">LL88-Exempt Buildings</h2>
              <p className="text-xs text-gray-600">
                Some buildings in your portfolio are tracked as &quot;Exempt&quot;
                because they do not meet covered building size thresholds or
                qualify for alternate compliance paths under LL88.
              </p>
              <div className="flex flex-wrap gap-1 mt-1">
                <Badge
                  variant="default"
                  className="border-gray-300 bg-white text-xs"
                >
                  <MinusCircle className="w-3 h-3 mr-1" />
                  Exempt building
                </Badge>
                <Badge
                  variant="default"
                  className="border-gray-300 bg-white text-xs"
                >
                  <Info className="w-3 h-3 mr-1" />
                  Still track lighting upgrades
                </Badge>
              </div>
            </div>
          </div>
        </Card>

        <Card className="border border-gray-200">
          <div className="p-4 flex items-start gap-3">
            <div className="p-2 rounded-lg bg-blue-50">
              <ShieldCheck className="w-4 h-4 text-blue-700" />
            </div>
            <div className="space-y-1">
              <h2 className="font-medium text-sm">LL88 Compliance Strategy</h2>
              <p className="text-xs text-gray-600">
                Use this view to coordinate lighting upgrades with LL97 carbon
                reduction work, capital planning, and tenant engagement to
                maximize savings and minimize disruption.
              </p>
              <div className="grid grid-cols-2 gap-2 mt-1 text-xs">
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-3 h-3 mt-0.5 text-emerald-500" />
                  <span>Align LL88 work with major tenant fit-outs</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-3 h-3 mt-0.5 text-emerald-500" />
                  <span>Coordinate with LL97 and retrofit sequencing</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-3 h-3 mt-0.5 text-emerald-500" />
                  <span>Document all fixture counts and controls</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-3 h-3 mt-0.5 text-emerald-500" />
                  <span>
                    Maintain records for LL88 inspection and DOB audits
                  </span>
                </div>
              </div>
              <div className="mt-2 flex flex-wrap gap-2">
                <div className="flex items-center gap-2 text-xs text-gray-500">
                  <Badge
                    variant="default"
                    className="border-blue-200 bg-blue-50 text-[0.7rem] px-2 py-0.5"
                  >
                    <Lightbulb className="w-3 h-3 mr-1" />
                    LL88 lighting
                  </Badge>
                  <Badge
                    variant="default"
                    className="border-emerald-200 bg-emerald-50 text-[0.7rem] px-2 py-0.5"
                  >
                    <Activity className="w-3 h-3 mr-1" />
                    LL97 carbon
                  </Badge>
                </div>
                <div className="text-xs text-gray-500">
                  Coordinate both to avoid rework and maximize incentives.
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}

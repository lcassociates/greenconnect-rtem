"use client";

import { useState } from "react";
import { Card } from "../../../components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../../components/ui/table";
import { Button } from "../../../components/ui/button";
import { Input } from "../../../components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
  DropdownMenuTrigger,
} from "../../../components/ui/dropdown-menu";
import {
  Building2,
  DollarSign,
  Filter,
  Search,
  ChevronUp,
  ChevronDown,
  FileText,
  ExternalLink,
  CheckCircle2,
  AlertTriangle,
  AlertCircle,
} from "lucide-react";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import {
  LL97Data,
  LL97ProjectData,
  type LL97Row,
  type LL97ProjectRow,
} from "../../../data/ll97";

interface LocalLaw97Props {
  clientId: string;
}

// columns we can sort on in the performance table
type PerformanceSortKey = keyof Pick<
  LL97Row,
  "ghgScore" | "exceedEmissions" | "penalty2030"
>;

// columns we can sort on in the project table
type ProjectSortKey = keyof Pick<
  LL97ProjectRow,
  "ghgReduction" | "kwhSavings" | "incentive"
>;

// status filter type
type StatusFilter = "Good" | "Close" | "Over";

export function LocalLaw97({ clientId }: LocalLaw97Props) {
  const [selectedBuildings, setSelectedBuildings] = useState<string[]>(
    LL97Data.map((b) => b.building),
  );
  const [searchTerm, setSearchTerm] = useState("");
  const [activeStatus, setActiveStatus] = useState<StatusFilter | null>(null);

  // Sorting state for Building Performance table
  const [performanceSortColumn, setPerformanceSortColumn] =
    useState<PerformanceSortKey | null>(null);
  const [performanceSortDirection, setPerformanceSortDirection] =
    useState<"asc" | "desc">("desc");

  // Sorting state for Project Impact table
  const [projectSortColumn, setProjectSortColumn] =
    useState<ProjectSortKey | null>(null);
  const [projectSortDirection, setProjectSortDirection] =
    useState<"asc" | "desc">("desc");

  const uniqueBuildings = Array.from(
    new Set(LL97Data.map((b) => b.building)),
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

  // Clear all filters
  const clearFilters = () => {
    setSelectedBuildings(uniqueBuildings);
    setSearchTerm("");
    setActiveStatus(null);
  };

  // Handle status card click
  const handleCardClick = (status: StatusFilter | null) => {
    setActiveStatus((prev) => (prev === status ? null : status));
  };

  // Helper function to get building status
  const getBuildingStatus = (ghgScore: number): StatusFilter => {
    const GHG_LIMIT = 4.53;
    const CLOSE_THRESHOLD = GHG_LIMIT * 0.91;

    if (ghgScore > GHG_LIMIT) return "Over";
    if (ghgScore > CLOSE_THRESHOLD && ghgScore <= GHG_LIMIT) return "Close";
    return "Good";
  };

  // Sorting handler for Building Performance table
  const handlePerformanceSort = (column: PerformanceSortKey) => {
    if (performanceSortColumn === column) {
      setPerformanceSortDirection((prev) =>
        prev === "asc" ? "desc" : "asc",
      );
    } else {
      setPerformanceSortColumn(column);
      setPerformanceSortDirection("desc");
    }
  };

  // Sorting handler for Project Impact table
  const handleProjectSort = (column: ProjectSortKey) => {
    if (projectSortColumn === column) {
      setProjectSortDirection((prev) =>
        prev === "asc" ? "desc" : "asc",
      );
    } else {
      setProjectSortColumn(column);
      setProjectSortDirection("desc");
    }
  };

  const filteredBuildingScores = LL97Data
    .filter((b) => selectedBuildings.includes(b.building))
    .filter((b) => {
      if (!activeStatus) return true;
      return getBuildingStatus(b.ghgScore) === activeStatus;
    });

  const filteredProjectData = LL97ProjectData.filter((p) =>
    selectedBuildings.includes(p.building),
  );

  // Sort Building Performance data
  const sortedBuildingScores = [...filteredBuildingScores].sort((a, b) => {
    if (!performanceSortColumn) return 0;

    const aValue = a[performanceSortColumn];
    const bValue = b[performanceSortColumn];

    return performanceSortDirection === "asc"
      ? aValue - bValue
      : bValue - aValue;
  });

  // Sort Project Impact data
  const sortedProjectData = [...filteredProjectData].sort((a, b) => {
    if (!projectSortColumn) return 0;

    const aValue = a[projectSortColumn];
    const bValue = b[projectSortColumn];

    return projectSortDirection === "asc"
      ? aValue - bValue
      : bValue - aValue;
  });

  // Calculate totals for Building Performance Summary
  const totalExceedEmissions = filteredBuildingScores.reduce(
    (sum, row) => sum + row.exceedEmissions,
    0,
  );
  const totalPenalty2030 = filteredBuildingScores.reduce(
    (sum, row) => sum + row.penalty2030,
    0,
  );

  // Calculate totals for Project Impact Summary
  const totalGhgReduction = filteredProjectData.reduce(
    (sum, row) => sum + row.ghgReduction,
    0,
  );
  const totalKwhSavings = filteredProjectData.reduce(
    (sum, row) => sum + row.kwhSavings,
    0,
  );
  const totalIncentive = filteredProjectData.reduce(
    (sum, row) => sum + row.incentive,
    0,
  );

  const totalProperties = LL97Data.length;

  // Calculate compliance status categories based on ALL buildings (not filtered)
  const GHG_LIMIT = 4.53;
  const CLOSE_THRESHOLD = GHG_LIMIT * 0.91;

  const buildingsOverLimit = LL97Data.filter(
    (b) => b.ghgScore > GHG_LIMIT,
  ).length;

  const buildingsClose = LL97Data.filter(
    (b) => b.ghgScore > CLOSE_THRESHOLD && b.ghgScore <= GHG_LIMIT,
  ).length;

  const buildingsGood = LL97Data.filter(
    (b) => b.ghgScore <= CLOSE_THRESHOLD,
  ).length;

  // Calculate total penalty for all buildings
  const allTotalPenalty2030 = LL97Data.reduce(
    (sum, row) => sum + row.penalty2030,
    0,
  );

  // Prepare data for donut chart
  const chartData = [
    { name: "Good", value: buildingsGood, color: "#16a34a" },
    { name: "Close", value: buildingsClose, color: "#ca8a04" },
    { name: "Over", value: buildingsOverLimit, color: "#dc2626" },
  ];

  // Handle chart segment click
  const handleChartClick = (data: any) => {
    if (data && data.name) {
      handleCardClick(data.name as StatusFilter);
    }
  };

  return (
    <div className="p-8 space-y-6">
      <h2 className="text-gray-900">
        Local Law 97 - Building Emissions Limit
      </h2>

      {/* About Local Law 97 Card */}
      <Card className="border-l-4 border-l-blue-500 bg-blue-50/50 border-blue-200">
        <div className="p-6">
          <div className="flex items-start gap-3">
            <FileText className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
            <div className="flex-1">
              <p className="text-sm text-gray-600 leading-relaxed">
                Most large buildings in NYC (&gt; 25,000 ft²) must meet new annual greenhouse gas emission limits starting in 2024, with stricter limits beginning in 2030.{" "}
                <a
                  href="https://www.nyc.gov/site/sustainablebuildings/ll97/local-law-97.page"
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

      {/* KPIs */}
      <div className="space-y-6">
        {/* Top Row: Total Properties and 2030 Exposure */}
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Left Side: Total Properties and 2030 Exposure (30%) */}
          <div className="w-full lg:w-[30%] space-y-6">
            <Card className="p-6 bg-blue-50">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">
                    Total Properties
                  </p>
                  <p className="text-gray-900">{totalProperties}</p>
                </div>
                <Building2 className="w-8 h-8 text-blue-600" />
              </div>
            </Card>

            <Card className="p-6 bg-orange-50">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">
                    2030 LL97 Exposure ($)
                  </p>
                  <p className="text-gray-900">
                    ${(allTotalPenalty2030 / 1000).toFixed(0)}K
                  </p>
                </div>
                <DollarSign className="w-8 h-8 text-orange-600" />
              </div>
            </Card>
          </div>

          {/* Right Side: Status Distribution Chart (70%) */}
          <div className="w-full lg:w-[70%]">
            <Card className="p-6 h-full">
              <h3 className="mb-4 text-gray-900">
                Compliance Status Distribution (2030 Target : 4.53)
              </h3>
              <div className="flex flex-col md:flex-row items-stretch gap-8">
                {/* Donut Chart with center text */}
                <div className="w-full md:w-2/5 flex items-center justify-center relative">
                  <ResponsiveContainer width="100%" height={220}>
                    <PieChart>
                      <Pie
                        data={chartData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={85}
                        paddingAngle={2}
                        dataKey="value"
                        onClick={handleChartClick}
                        className="cursor-pointer focus:outline-none"
                      >
                        {chartData.map((entry, index) => (
                          <Cell
                            key={`cell-${index}`}
                            fill={entry.color}
                            stroke={
                              activeStatus === entry.name ? "#000" : "none"
                            }
                            strokeWidth={
                              activeStatus === entry.name ? 3 : 0
                            }
                            className="transition-all duration-200 hover:opacity-80"
                          />
                        ))}
                      </Pie>
                      <Tooltip
                        formatter={(value: number) => [value, "Buildings"]}
                        contentStyle={{
                          backgroundColor: "white",
                          border: "1px solid #e5e7eb",
                          borderRadius: "6px",
                        }}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                  {/* Center text */}
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div className="text-center">
                      <p className="text-gray-900">{totalProperties}</p>
                      <p className="text-xs text-gray-600">Buildings</p>
                    </div>
                  </div>
                </div>

                {/* Status cards */}
                <div className="w-full md:w-3/5 flex flex-col justify-center space-y-3">
                  <div
                    className={`p-4 rounded-lg bg-green-50 cursor-pointer transition-all duration-200 hover:shadow-md hover:scale-[1.02] border-2 ${
                      activeStatus === "Good"
                        ? "border-green-500 shadow-md"
                        : "border-transparent"
                    }`}
                    onClick={() => handleCardClick("Good")}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-green-600 flex items-center justify-center flex-shrink-0">
                          <CheckCircle2 className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <p className="text-gray-900">Good Standing</p>
                          <p className="text-xs text-gray-600">
                            GHG Score ≤ 4.12
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-gray-900">{buildingsGood}</p>
                        <p className="text-xs text-gray-600">buildings</p>
                      </div>
                    </div>
                  </div>

                  <div
                    className={`p-4 rounded-lg bg-yellow-50 cursor-pointer transition-all duration-200 hover:shadow-md hover:scale-[1.02] border-2 ${
                      activeStatus === "Close"
                        ? "border-yellow-500 shadow-md"
                        : "border-transparent"
                    }`}
                    onClick={() => handleCardClick("Close")}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-yellow-600 flex items-center justify-center flex-shrink-0">
                          <AlertTriangle className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <p className="text-gray-900">Close to Limit</p>
                          <p className="text-xs text-gray-600">
                            Within 9% of limit
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-gray-900">{buildingsClose}</p>
                        <p className="text-xs text-gray-600">buildings</p>
                      </div>
                    </div>
                  </div>

                  <div
                    className={`p-4 rounded-lg bg-red-50 cursor-pointer transition-all duration-200 hover:shadow-md hover:scale-[1.02] border-2 ${
                      activeStatus === "Over"
                        ? "border-red-500 shadow-md"
                        : "border-transparent"
                    }`}
                    onClick={() => handleCardClick("Over")}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-red-600 flex items-center justify-center flex-shrink-0">
                          <AlertCircle className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <p className="text-gray-900">Over Limit</p>
                          <p className="text-xs text-gray-600">
                            GHG Score &gt; 4.53
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-gray-900">{buildingsOverLimit}</p>
                        <p className="text-xs text-gray-600">buildings</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>

      {/* Filter Button */}
      <div className="flex justify-end">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="flex items-center gap-2">
              <Filter className="w-4 h-4" />
              Filter Buildings ({selectedBuildings.length})
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-64">
            {/* Search Input */}
            <div className="p-2 border-b">
              <div className="relative">
                <Search className="absolute left-2 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  placeholder="Search buildings..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-8"
                />
              </div>
            </div>

            {/* Select All Checkbox */}
            <DropdownMenuCheckboxItem
              checked={selectedBuildings.length === uniqueBuildings.length}
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
                    checked={selectedBuildings.includes(building)}
                    onCheckedChange={() => toggleBuilding(building)}
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
            <div className="p-2">
              <Button
                variant="outline"
                className="w-full"
                onClick={clearFilters}
              >
                Clear Filters
              </Button>
            </div>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Building Performance Table */}
      <Card className="p-6">
        <h3 className="mb-4 text-gray-900">Building Performance Summary</h3>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-left">Building</TableHead>
                <TableHead
                  className="text-center cursor-pointer"
                  onClick={() => handlePerformanceSort("ghgScore")}
                >
                  <div className="inline-flex items-center gap-2 hover:text-gray-900 transition-colors">
                    <span className="break-words">GHG Score</span>
                    {performanceSortColumn === "ghgScore" ? (
                      performanceSortDirection === "desc" ? (
                        <ChevronDown className="w-4 h-4" />
                      ) : (
                        <ChevronUp className="w-4 h-4" />
                      )
                    ) : (
                      <ChevronUp className="w-4 h-4 text-gray-300" />
                    )}
                  </div>
                </TableHead>
                <TableHead
                  className="text-center cursor-pointer"
                  onClick={() => handlePerformanceSort("exceedEmissions")}
                >
                  <div className="inline-flex items-center gap-2 hover:text-gray-900 transition-colors">
                    <span className="break-words">
                      Exceed GHG Emissions (tCO2e)
                    </span>
                    {performanceSortColumn === "exceedEmissions" ? (
                      performanceSortDirection === "desc" ? (
                        <ChevronDown className="w-4 h-4" />
                      ) : (
                        <ChevronUp className="w-4 h-4" />
                      )
                    ) : (
                      <ChevronUp className="w-4 h-4 text-gray-300" />
                    )}
                  </div>
                </TableHead>
                <TableHead
                  className="text-center cursor-pointer"
                  onClick={() => handlePerformanceSort("penalty2030")}
                >
                  <div className="inline-flex items-center gap-2 hover:text-gray-900 transition-colors">
                    <span className="break-words">2030 Penalties ($)</span>
                    {performanceSortColumn === "penalty2030" ? (
                      performanceSortDirection === "desc" ? (
                        <ChevronDown className="w-4 h-4" />
                      ) : (
                        <ChevronUp className="w-4 h-4" />
                      )
                    ) : (
                      <ChevronUp className="w-4 h-4 text-gray-300" />
                    )}
                  </div>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sortedBuildingScores.map((row, idx) => (
                <TableRow key={idx}>
                  <TableCell className="text-left">
                    {row.building}
                  </TableCell>
                  <TableCell className="text-center">
                    <span
                      className={
                        row.ghgScore > 4.53
                          ? "text-red-600"
                          : "text-green-600"
                      }
                    >
                      {row.ghgScore}
                    </span>
                  </TableCell>
                  <TableCell className="text-center">
                    {row.exceedEmissions.toLocaleString()}
                  </TableCell>
                  <TableCell className="text-center">
                    ${row.penalty2030.toLocaleString()}
                  </TableCell>
                </TableRow>
              ))}
              {/* Summary Row */}
              <TableRow className="bg-gray-50">
                <TableCell className="text-left">
                  <strong>Total</strong>
                </TableCell>
                <TableCell className="text-center">
                  <strong>-</strong>
                </TableCell>
                <TableCell className="text-center">
                  <strong>
                    {totalExceedEmissions.toLocaleString()}
                  </strong>
                </TableCell>
                <TableCell className="text-center">
                  <strong>${totalPenalty2030.toLocaleString()}</strong>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </Card>

      {/* Project Impact Table */}
      <Card className="p-6">
        <h3 className="mb-4 text-gray-900">Project Impact Summary</h3>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-left">Building</TableHead>
                <TableHead className="text-left">Project Title</TableHead>
                <TableHead
                  className="text-center cursor-pointer"
                  onClick={() => handleProjectSort("ghgReduction")}
                >
                  <div className="inline-flex items-center gap-2 hover:text-gray-900 transition-colors">
                    <span className="break-words">GHG Score Reduction</span>
                    {projectSortColumn === "ghgReduction" ? (
                      projectSortDirection === "desc" ? (
                        <ChevronDown className="w-4 h-4" />
                      ) : (
                        <ChevronUp className="w-4 h-4" />
                      )
                    ) : (
                      <ChevronUp className="w-4 h-4 text-gray-300" />
                    )}
                  </div>
                </TableHead>
                <TableHead
                  className="text-center cursor-pointer"
                  onClick={() => handleProjectSort("kwhSavings")}
                >
                  <div className="inline-flex items-center gap-2 hover:text-gray-900 transition-colors">
                    <span className="break-words">kWh Savings</span>
                    {projectSortColumn === "kwhSavings" ? (
                      projectSortDirection === "desc" ? (
                        <ChevronDown className="w-4 h-4" />
                      ) : (
                        <ChevronUp className="w-4 h-4" />
                      )
                    ) : (
                      <ChevronUp className="w-4 h-4 text-gray-300" />
                    )}
                  </div>
                </TableHead>
                <TableHead
                  className="text-center cursor-pointer"
                  onClick={() => handleProjectSort("incentive")}
                >
                  <div className="inline-flex items-center gap-2 hover:text-gray-900 transition-colors">
                    <span className="break-words">
                      Estimated Incentive ($)
                    </span>
                    {projectSortColumn === "incentive" ? (
                      projectSortDirection === "desc" ? (
                        <ChevronDown className="w-4 h-4" />
                      ) : (
                        <ChevronUp className="w-4 h-4" />
                      )
                    ) : (
                      <ChevronUp className="w-4 h-4 text-gray-300" />
                    )}
                  </div>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sortedProjectData.map((row, idx) => (
                <TableRow key={idx}>
                  <TableCell className="text-left">
                    {row.building}
                  </TableCell>
                  <TableCell className="text-left">
                    {row.project}
                  </TableCell>
                  <TableCell className="text-center text-green-600">
                    -{row.ghgReduction}
                  </TableCell>
                  <TableCell className="text-center">
                    {row.kwhSavings.toLocaleString()}
                  </TableCell>
                  <TableCell className="text-center">
                    ${row.incentive.toLocaleString()}
                  </TableCell>
                </TableRow>
              ))}
              {/* Summary Row */}
              <TableRow className="bg-gray-50">
                <TableCell className="text-left">
                  <strong>Total</strong>
                </TableCell>
                <TableCell className="text-left">
                  <strong>-</strong>
                </TableCell>
                <TableCell className="text-center text-green-600">
                  <strong>-{totalGhgReduction.toFixed(1)}</strong>
                </TableCell>
                <TableCell className="text-center">
                  <strong>
                    {totalKwhSavings.toLocaleString()}
                  </strong>
                </TableCell>
                <TableCell className="text-center">
                  <strong>${totalIncentive.toLocaleString()}</strong>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </Card>
    </div>
  );
}

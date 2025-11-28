"use client";

import { useState } from "react";
import { Card } from "../../ui/card";
import {
  Building2,
  CheckCircle2,
  Activity,
  PlayCircle,
  XCircle,
  MinusCircle,
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
import { ll88SubmeteringData } from "../../../data/ll88Submetering";

interface LocalLaw88SubmeteringProps {
  clientId: string;
}

export function LocalLaw88Submetering({
  clientId,
}: LocalLaw88SubmeteringProps) {
  const [selectedBuildings, setSelectedBuildings] = useState<string[]>(
    ll88SubmeteringData.map((b) => b.building),
  );
  const [searchTerm, setSearchTerm] = useState("");
  const [sortColumn, setSortColumn] = useState<string | null>(null);
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">(
    "asc",
  );

  // Status filtering
  const allStatuses = [
    "Completed",
    "In Progress",
    "Not Started",
    "Due",
    "Exempt",
  ];
  const [selectedStatuses, setSelectedStatuses] =
    useState<string[]>(allStatuses);

  const uniqueBuildings = Array.from(
    new Set(ll88SubmeteringData.map((b) => b.building)),
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

  const filteredData = ll88SubmeteringData.filter(
    (b) =>
      selectedBuildings.includes(b.building) &&
      selectedStatuses.includes(b.status),
  );

  const totalBuildings = filteredData.length;
  const Completed = filteredData.filter(
    (b) => b.status === "Completed",
  ).length;
  const inProgress = filteredData.filter(
    (b) => b.status === "In Progress",
  ).length;
  const notStarted = filteredData.filter(
    (b) => b.status === "Not Started",
  ).length;
  const behindSchedule = filteredData.filter(
    (b) => b.status === "Due",
  ).length;
  const exempt = filteredData.filter(
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
      label: "Completed",
      value: Completed.toString(),
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
      value: behindSchedule.toString(),
      icon: XCircle,
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
    } else {
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
      case "Due":
        return "bg-red-100 text-red-800";
      case "Exempt":
        return "bg-gray-100 text-gray-800";
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

    let aValue: any = (a as any)[sortColumn];
    let bValue: any = (b as any)[sortColumn];

    if (
      sortColumn === "installationYear" ||
      sortColumn === "meterCount" ||
      sortColumn === "tenants"
    ) {
      if (aValue < bValue)
        return sortDirection === "asc" ? -1 : 1;
      if (aValue > bValue)
        return sortDirection === "asc" ? 1 : -1;
      return 0;
    }

    if (aValue < bValue)
      return sortDirection === "asc" ? -1 : 1;
    if (aValue > bValue)
      return sortDirection === "asc" ? 1 : -1;
    return 0;
  });

  const totalMeterCount = sortedData.reduce(
    (sum, building) => sum + building.meterCount,
    0,
  );
  const totalTenants = sortedData.reduce(
    (sum, building) => sum + building.tenants,
    0,
  );

  return (
    <div className="p-8">
      <h2 className="mb-6 text-gray-900">
        Local Law 88 - Submetering
      </h2>

      {/* About card ...  */}
    </div>
  );
}

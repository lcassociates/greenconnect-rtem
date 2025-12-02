import { Card } from "../ui/card";
import {
  Building2,
  DollarSign,
  TrendingDown,
  CheckCircle,
  AlertCircle,
  Clock,
  FolderKanban,
} from "lucide-react";
import { Badge } from "../ui/badge";

interface ClientOverviewPageProps {
  clientId: string;
}

const recentActivities = [
  {
    id: 1,
    action: "Completed energy audit",
    building: "100 Broadway",
    date: "Nov 15, 2025",
    status: "completed",
  },
  {
    id: 2,
    action: "LL87 filing submitted",
    building: "1180 Ave of Americas",
    date: "Nov 14, 2025",
    status: "completed",
  },
  {
    id: 3,
    action: "HVAC upgrade in progress",
    building: "1370 Ave of the Americas",
    date: "Nov 12, 2025",
    status: "in-progress",
  },
  {
    id: 4,
    action: "Procurement contract renewal",
    building: "Portfolio-wide",
    date: "Nov 10, 2025",
    status: "pending",
  },
  {
    id: 5,
    action: "LED retrofit completed",
    building: "520 Broadway",
    date: "Nov 8, 2025",
    status: "completed",
  },
];

const upcomingDeadlines = [
  {
    id: 1,
    task: "LL87 Benchmarking Report",
    building: "Multiple Properties",
    deadline: "Dec 1, 2025",
    priority: "high",
  },
  {
    id: 2,
    task: "Energy Star Recertification",
    building: "175 Pearl St",
    deadline: "Dec 15, 2025",
    priority: "medium",
  },
  {
    id: 3,
    task: "LL97 Compliance Review",
    building: "100 Broadway",
    deadline: "Jan 5, 2026",
    priority: "high",
  },
];

export function ClientOverviewPage({
  clientId,
}: ClientOverviewPageProps) {
  const totalProperties = 10;
  const activeProjects = 8;
  const annualEnergySavings = 340000;

  return (
    <div className="p-8 space-y-6">
      {/* Welcome Section */}
      <div>
        <h2 className="text-gray-900 mb-2">Portfolio Dashboard</h2>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="p-6">
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

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">
                Active Projects
              </p>
              <p className="text-gray-900">{activeProjects}</p>
            </div>
            <FolderKanban className="w-8 h-8 text-orange-600" />
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">
                Annual Energy Savings
              </p>
              <p className="text-gray-900">{annualEnergySavings.toLocaleString()} kWh</p>
            </div>
            <TrendingDown className="w-8 h-8 text-green-600" />
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">
                Cost Savings (YTD)
              </p>
              <p className="text-gray-900">$42.5K</p>
              <p className="text-xs text-green-600 mt-1">
                +12% vs last year
              </p>
            </div>
            <DollarSign className="w-8 h-8 text-green-600" />
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activities */}
        <Card className="p-6">
          <h3 className="mb-4 text-gray-900">Recent Activities</h3>
          <div className="space-y-4">
            {recentActivities.map((activity) => (
              <div
                key={activity.id}
                className="flex items-start justify-between pb-4 border-b border-gray-100 last:border-0 last:pb-0"
              >
                <div className="flex items-start gap-3">
                  {activity.status === "completed" && (
                    <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                  )}
                  {activity.status === "in-progress" && (
                    <Clock className="w-5 h-5 text-blue-600 mt-0.5" />
                  )}
                  {activity.status === "pending" && (
                    <AlertCircle className="w-5 h-5 text-orange-600 mt-0.5" />
                  )}
                  <div>
                    <p className="text-sm text-gray-900">
                      {activity.action}
                    </p>
                    <p className="text-xs text-gray-500">
                      {activity.building}
                    </p>
                  </div>
                </div>
                <p className="text-xs text-gray-500">{activity.date}</p>
              </div>
            ))}
          </div>
        </Card>

        {/* Upcoming Deadlines */}
        <Card className="p-6">
          <h3 className="mb-4 text-gray-900">Upcoming Deadlines</h3>
          <div className="space-y-4">
            {upcomingDeadlines.map((deadline) => (
              <div
                key={deadline.id}
                className="flex items-start justify-between pb-4 border-b border-gray-100 last:border-0 last:pb-0"
              >
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <p className="text-sm text-gray-900">
                      {deadline.task}
                    </p>
                    <Badge
                      variant={
                        deadline.priority === "high"
                          ? "destructive"
                          : "secondary"
                      }
                    >
                      {deadline.priority}
                    </Badge>
                  </div>
                  <p className="text-xs text-gray-500">
                    {deadline.building}
                  </p>
                </div>
                <p className="text-xs text-gray-500">
                  {deadline.deadline}
                </p>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Quick Stats Summary */}
      <Card className="p-6">
        <h3 className="mb-4 text-gray-900">Compliance Overview</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-green-50 p-4 rounded-lg border border-green-200">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-600" />
                <p className="text-sm text-gray-900">LL87 Compliant</p>
              </div>
              <p className="text-sm text-gray-900">8 of 10</p>
            </div>
            <div className="w-full bg-green-200 rounded-full h-2 mb-3">
              <div 
                className="bg-green-600 h-2 rounded-full transition-all duration-300"
                style={{ width: '80%' }}
              ></div>
            </div>
            <p className="text-xs text-gray-600">2 pending filings</p>
          </div>
          <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-blue-600" />
                <p className="text-sm text-gray-900">Energy Star Certified</p>
              </div>
              <p className="text-sm text-gray-900">6 of 10</p>
            </div>
            <div className="w-full bg-blue-200 rounded-full h-2 mb-3">
              <div 
                className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                style={{ width: '60%' }}
              ></div>
            </div>
            <p className="text-xs text-gray-600">4 in process</p>
          </div>
          <div>
            <div className="bg-red-50 p-4 rounded-lg border border-red-200">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-red-600" />
                  <p className="text-sm text-gray-900">LL97 Due</p>
                </div>
                <Badge variant="default" className="text-sm px-3 py-1">
                  3 properties
                </Badge>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-3.5 h-3.5 text-red-600" />
                <p className="text-xs text-red-600">Immediate action required</p>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}

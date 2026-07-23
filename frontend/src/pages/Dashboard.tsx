import { useState, useEffect } from "react";
import {
  LayoutDashboard,
  TrendingUp,
  TrendingDown,
  Users,
  DollarSign,
  Activity,
  Zap,
  ArrowUpRight,
  ArrowDownRight,
  RefreshCw,
  Sparkles,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface MetricCard {
  id: string;
  label: string;
  value: string;
  change: number;
  icon: typeof TrendingUp;
  accent: string;
}

interface ActivityItem {
  id: string;
  user: string;
  action: string;
  target: string;
  timestamp: string;
  value: string;
}

const metrics: MetricCard[] = [
  {
    id: "revenue",
    label: "Total Revenue",
    value: "$847,290",
    change: 12.5,
    icon: DollarSign,
    accent: "from-emerald-500 to-teal-500",
  },
  {
    id: "active-users",
    label: "Active Users",
    value: "24,847",
    change: 8.2,
    icon: Users,
    accent: "from-blue-500 to-indigo-500",
  },
  {
    id: "conversion",
    label: "Conversion Rate",
    value: "4.82%",
    change: -2.1,
    icon: Zap,
    accent: "from-purple-500 to-fuchsia-500",
  },
  {
    id: "sessions",
    label: "Live Sessions",
    value: "1,294",
    change: 18.7,
    icon: Activity,
    accent: "from-amber-500 to-orange-500",
  },
];

const activities: ActivityItem[] = [
  {
    id: "1",
    user: "Sarah Chen",
    action: "completed checkout",
    target: "Enterprise Plan",
    timestamp: "2 min ago",
    value: "$2,499",
  },
  {
    id: "2",
    user: "Marcus Reid",
    action: "upgraded subscription",
    target: "Pro Annual",
    timestamp: "8 min ago",
    value: "$599",
  },
  {
    id: "3",
    user: "Aisha Patel",
    action: "started trial",
    target: "Growth Plan",
    timestamp: "15 min ago",
    value: "$0",
  },
  {
    id: "4",
    user: "Diego Torres",
    action: "invited teammate",
    target: "Workspace Alpha",
    timestamp: "23 min ago",
    value: "—",
  },
  {
    id: "5",
    user: "Lena Vogel",
    action: "exported report",
    target: "Q3 Analytics",
    timestamp: "41 min ago",
    value: "—",
  },
];

const chartData = [42, 58, 51, 67, 72, 65, 81, 88, 76, 94, 102, 89];

const Dashboard = () => {
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [liveCount, setLiveCount] = useState(1294);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 800);
    const interval = setInterval(() => {
      setLiveCount((c) => Math.max(1100, c + Math.floor(Math.random() * 21) - 10));
    }, 3000);
    return () => {
      clearTimeout(timer);
      clearInterval(interval);
    };
  }, []);

  const handleRefresh = () => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 1200);
  };

  return (
    <div
      className="space-y-6"
      data-testid="dashboard-page"
    >
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <div className="flex items-center gap-2">
            <LayoutDashboard className="h-5 w-5 text-indigo-400" aria-hidden="true" />
            <span className="text-sm font-medium text-indigo-300">Overview</span>
          </div>
          <h1 className="mt-1 text-2xl font-bold text-white">Welcome back, Alex</h1>
          <p className="mt-1 text-sm text-slate-400">
            Here's what's happening with your analytics today.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            onClick={handleRefresh}
            className="gap-2 border-slate-700 bg-slate-900/50 text-slate-200 hover:bg-slate-800 hover:text-white"
            data-testid="dashboard-refresh-button"
          >
            <RefreshCw className={`h-4 w-4 ${refreshing ? "animate-spin" : ""}`} aria-hidden="true" />
            Refresh
          </Button>
          <Button
            className="gap-2 bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-500 hover:to-blue-500"
            data-testid="dashboard-new-report-button"
          >
            <Sparkles className="h-4 w-4" aria-hidden="true" />
            New Report
          </Button>
        </div>
      </div>

      {/* Metric Cards */}
      {loading ? (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[1, 2, 3, 4].map((i) => (
            <Card key={i} className="border-slate-800 bg-slate-900/50">
              <CardContent className="p-6">
                <div className="h-24 animate-pulse rounded bg-slate-800/50" />
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {metrics.map((m) => {
            const Icon = m.icon;
            const positive = m.change >= 0;
            return (
              <Card
                key={m.id}
                className="group relative overflow-hidden border-slate-800 bg-slate-900/50 backdrop-blur-xl transition-all duration-300 hover:border-indigo-500/50 hover:shadow-lg hover:shadow-indigo-500/10"
                data-testid={`dashboard-kpi-${m.id}`}
              >
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-xs font-medium uppercase tracking-wider text-slate-400">
                    {m.label}
                  </CardTitle>
                  <div
                    className={`rounded-lg bg-gradient-to-br ${m.accent} p-2 transition-transform duration-300 group-hover:scale-110`}
                  >
                    <Icon className="h-4 w-4 text-white" aria-hidden="true" />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-white">{m.value}</div>
                  <div className="mt-1 flex items-center gap-1 text-xs">
                    <span
                      className={`flex items-center gap-0.5 font-semibold ${
                        positive ? "text-emerald-400" : "text-red-400"
                      }`}
                    >
                      {positive ? (
                        <ArrowUpRight className="h-3 w-3" aria-hidden="true" />
                      ) : (
                        <ArrowDownRight className="h-3 w-3" aria-hidden="true" />
                      )}
                      {Math.abs(m.change)}%
                    </span>
                    <span className="text-slate-500">vs last month</span>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}

      {/* Chart + Live Panel */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        {/* Line Chart */}
        <Card
          className="border-slate-800 bg-slate-900/50 backdrop-blur-xl lg:col-span-2"
          data-testid="dashboard-chart-card"
        >
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-white">Revenue Trend</CardTitle>
                <CardDescription className="text-slate-400">
                  Last 12 months performance
                </CardDescription>
              </div>
              <Badge className="border-0 bg-emerald-500/10 text-emerald-400" variant="outline">
                <TrendingUp className="mr-1 h-3 w-3" aria-hidden="true" />
                +24.6%
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="relative h-64 w-full">
              <svg
                viewBox="0 0 400 200"
                className="h-full w-full"
                preserveAspectRatio="none"
                aria-hidden="true"
              >
                <defs>
                  <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="rgb(99 102 241)" stopOpacity="0.5" />
                    <stop offset="100%" stopColor="rgb(99 102 241)" stopOpacity="0" />
                  </linearGradient>
                </defs>
                <path
                  d={`M 0 ${200 - chartData[0] * 1.5} ${chartData
                    .map((v, i) => `L ${(i / (chartData.length - 1)) * 400} ${200 - v * 1.5}`)
                    .join(" ")}`}
                  fill="url(#chartGrad)"
                  stroke="rgb(129 140 248)"
                  strokeWidth="2"
                />
              </svg>
              <div className="absolute inset-x-0 bottom-0 flex justify-between text-[10px] text-slate-500">
                {["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"].map(
                  (mo) => (
                    <span key={mo}>{mo}</span>
                  )
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Live Activity Feed */}
        <Card
          className="border-slate-800 bg-slate-900/50 backdrop-blur-xl"
          data-testid="dashboard-live-panel"
        >
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-white">Live Visitors</CardTitle>
              <span className="flex items-center gap-1.5">
                <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-500" />
                <span className="text-xs text-slate-400">Real-time</span>
              </span>
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold text-white" aria-live="polite">
              {liveCount.toLocaleString()}
            </div>
            <div className="mt-4 space-y-3">
              {activities.slice(0, 3).map((a) => (
                <div key={a.id} className="flex items-start gap-3">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 to-blue-500 text-xs font-semibold text-white">
                    {a.user.charAt(0)}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm text-slate-300">
                      <span className="font-medium text-white">{a.user}</span>{" "}
                      {a.action}
                    </p>
                    <p className="truncate text-xs text-slate-500">
                      {a.target} · {a.timestamp}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Activity Table */}
      <Card
        className="border-slate-800 bg-slate-900/50 backdrop-blur-xl"
        data-testid="dashboard-activity-table"
      >
        <CardHeader>
          <CardTitle className="text-white">Recent Activity</CardTitle>
          <CardDescription className="text-slate-400">
            Latest events across your workspace
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-800 text-left text-xs uppercase tracking-wider text-slate-500">
                  <th className="pb-3 pr-4 font-medium">User</th>
                  <th className="pb-3 pr-4 font-medium">Action</th>
                  <th className="pb-3 pr-4 font-medium">Target</th>
                  <th className="pb-3 pr-4 font-medium">Value</th>
                  <th className="pb-3 font-medium">Time</th>
                </tr>
              </thead>
              <tbody>
                {activities.map((a) => (
                  <tr
                    key={a.id}
                    className="border-b border-slate-800/50 transition-colors hover:bg-slate-800/30"
                  >
                    <td className="py-3 pr-4">
                      <div className="flex items-center gap-2">
                        <div className="flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 to-blue-500 text-xs font-semibold text-white">
                          {a.user.charAt(0)}
                        </div>
                        <span className="font-medium text-white">{a.user}</span>
                      </div>
                    </td>
                    <td className="py-3 pr-4 text-slate-300">{a.action}</td>
                    <td className="py-3 pr-4 text-slate-300">{a.target}</td>
                    <td className="py-3 pr-4 font-mono text-xs text-indigo-300">{a.value}</td>
                    <td className="py-3 text-slate-500">{a.timestamp}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;

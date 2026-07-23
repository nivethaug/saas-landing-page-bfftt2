import { useState, useEffect, useMemo } from "react";
import {
  BarChart3,
  TrendingUp,
  TrendingDown,
  Search,
  Filter,
  ArrowUpRight,
  ArrowDownRight,
  Download,
  Globe,
  Smartphone,
  Monitor,
  Clock,
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
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface MetricRow {
  id: string;
  name: string;
  category: string;
  value: number;
  change: number;
  unit: string;
}

const allMetrics: MetricRow[] = [
  { id: "m1", name: "Page Views", category: "Traffic", value: 1847203, change: 14.2, unit: "" },
  { id: "m2", name: "Unique Visitors", category: "Traffic", value: 492881, change: 8.7, unit: "" },
  { id: "m3", name: "Bounce Rate", category: "Engagement", value: 38.4, change: -3.1, unit: "%" },
  { id: "m4", name: "Avg Session Duration", category: "Engagement", value: 248, change: 11.5, unit: "s" },
  { id: "m5", name: "Pages per Session", category: "Engagement", value: 3.74, change: 2.8, unit: "" },
  { id: "m6", name: "Conversion Rate", category: "Conversion", value: 4.82, change: -1.2, unit: "%" },
  { id: "m7", name: "Revenue per Visit", category: "Revenue", value: 0.46, change: 6.3, unit: "$" },
  { id: "m8", name: "Cart Abandonment", category: "Conversion", value: 62.1, change: -4.5, unit: "%" },
  { id: "m9", name: "Goal Completions", category: "Conversion", value: 12743, change: 19.8, unit: "" },
  { id: "m10", name: "New Signups", category: "Acquisition", value: 3481, change: 22.1, unit: "" },
  { id: "m11", name: "Churn Rate", category: "Retention", value: 2.4, change: -0.8, unit: "%" },
  { id: "m12", name: "Net Promoter Score", category: "Satisfaction", value: 68, change: 5.2, unit: "" },
];

const trafficSources = [
  { name: "Organic Search", value: 42, color: "bg-indigo-500" },
  { name: "Direct", value: 24, color: "bg-blue-500" },
  { name: "Social", value: 18, color: "bg-purple-500" },
  { name: "Referral", value: 11, color: "bg-fuchsia-500" },
  { name: "Email", value: 5, color: "bg-pink-500" },
];

const deviceBreakdown = [
  { name: "Desktop", value: 58, icon: Monitor },
  { name: "Mobile", value: 36, icon: Smartphone },
  { name: "Tablet", value: 6, icon: Globe },
];

const formatValue = (value: number, unit: string) => {
  if (unit === "$") return `$${value.toFixed(2)}`;
  if (unit === "%") return `${value.toFixed(1)}%`;
  if (unit === "s") {
    const mins = Math.floor(value / 60);
    const secs = value % 60;
    return mins > 0 ? `${mins}m ${secs}s` : `${secs}s`;
  }
  return value.toLocaleString();
};

const Metrics = () => {
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [range, setRange] = useState("30d");

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 700);
    return () => clearTimeout(t);
  }, []);

  const categories = useMemo(
    () => ["All", ...Array.from(new Set(allMetrics.map((m) => m.category)))],
    []
  );

  const filtered = useMemo(() => {
    return allMetrics.filter((m) => {
      const matchSearch = m.name.toLowerCase().includes(search.toLowerCase());
      const matchCat = category === "All" || m.category === category;
      return matchSearch && matchCat;
    });
  }, [search, category]);

  return (
    <div className="space-y-6" data-testid="metrics-page">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <div className="flex items-center gap-2">
            <BarChart3 className="h-5 w-5 text-blue-400" aria-hidden="true" />
            <span className="text-sm font-medium text-blue-300">Analytics</span>
          </div>
          <h1 className="mt-1 text-2xl font-bold text-white">Metrics Explorer</h1>
          <p className="mt-1 text-sm text-slate-400">
            Deep-dive into your performance indicators and trends.
          </p>
        </div>
        <Button
          variant="outline"
          className="gap-2 border-slate-700 bg-slate-900/50 text-slate-200 hover:bg-slate-800 hover:text-white"
          data-testid="metrics-export-button"
        >
          <Download className="h-4 w-4" aria-hidden="true" />
          Export Data
        </Button>
      </div>

      {/* Filters */}
      <Card
        className="border-slate-800 bg-slate-900/50 backdrop-blur-xl"
        data-testid="metrics-filters"
      >
        <CardContent className="flex flex-col gap-3 p-4 md:flex-row md:items-center">
          <div className="relative flex-1">
            <Search
              className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500"
              aria-hidden="true"
            />
            <Input
              aria-label="Search metrics"
              placeholder="Search metrics..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="border-slate-700 bg-slate-950/50 pl-9 text-slate-200 placeholder:text-slate-500"
              data-testid="metrics-search-input"
            />
          </div>
          <Select value={category} onValueChange={setCategory}>
            <SelectTrigger
              className="w-full border-slate-700 bg-slate-950/50 text-slate-200 md:w-48"
              aria-label="Filter by category"
              data-testid="metrics-category-select"
            >
              <Filter className="mr-2 h-4 w-4 text-slate-500" aria-hidden="true" />
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="border-slate-700 bg-slate-900">
              {categories.map((c) => (
                <SelectItem key={c} value={c}>
                  {c}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={range} onValueChange={setRange}>
            <SelectTrigger
              className="w-full border-slate-700 bg-slate-950/50 text-slate-200 md:w-40"
              aria-label="Select time range"
              data-testid="metrics-range-select"
            >
              <Clock className="mr-2 h-4 w-4 text-slate-500" aria-hidden="true" />
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="border-slate-700 bg-slate-900">
              <SelectItem value="7d">Last 7 days</SelectItem>
              <SelectItem value="30d">Last 30 days</SelectItem>
              <SelectItem value="90d">Last 90 days</SelectItem>
              <SelectItem value="1y">Last year</SelectItem>
            </SelectContent>
          </Select>
        </CardContent>
      </Card>

      {/* Top Metrics */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        {[
          { label: "Total Page Views", value: "1.84M", change: 14.2 },
          { label: "Avg Session", value: "4m 8s", change: 11.5 },
          { label: "Goal Completions", value: "12,743", change: 19.8 },
        ].map((t) => (
          <Card
            key={t.label}
            className="border-slate-800 bg-slate-900/50 backdrop-blur-xl"
            data-testid={`metrics-top-${t.label.replace(/\s/g, "-").toLowerCase()}`}
          >
            <CardContent className="p-5">
              <p className="text-xs uppercase tracking-wider text-slate-400">{t.label}</p>
              <div className="mt-2 flex items-end justify-between">
                <span className="text-2xl font-bold text-white">{t.value}</span>
                <span
                  className={`flex items-center gap-0.5 text-xs font-semibold ${
                    t.change >= 0 ? "text-emerald-400" : "text-red-400"
                  }`}
                >
                  {t.change >= 0 ? (
                    <ArrowUpRight className="h-3 w-3" aria-hidden="true" />
                  ) : (
                    <ArrowDownRight className="h-3 w-3" aria-hidden="true" />
                  )}
                  {Math.abs(t.change)}%
                </span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        {/* Metrics Table */}
        <Card
          className="border-slate-800 bg-slate-900/50 backdrop-blur-xl lg:col-span-2"
          data-testid="metrics-table-card"
        >
          <CardHeader>
            <CardTitle className="text-white">All Metrics</CardTitle>
            <CardDescription className="text-slate-400">
              {filtered.length} metrics · {category} · {range}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="space-y-2">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div key={i} className="h-12 animate-pulse rounded bg-slate-800/50" />
                ))}
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-slate-800 text-left text-xs uppercase tracking-wider text-slate-500">
                      <th className="pb-3 pr-4 font-medium">Metric</th>
                      <th className="pb-3 pr-4 font-medium">Category</th>
                      <th className="pb-3 pr-4 text-right font-medium">Value</th>
                      <th className="pb-3 text-right font-medium">Change</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filtered.map((m) => (
                      <tr
                        key={m.id}
                        className="border-b border-slate-800/50 transition-colors hover:bg-slate-800/30"
                      >
                        <td className="py-3 pr-4 font-medium text-white">{m.name}</td>
                        <td className="py-3 pr-4">
                          <Badge
                            variant="outline"
                            className="border-slate-700 bg-slate-800/50 text-xs text-slate-300"
                          >
                            {m.category}
                          </Badge>
                        </td>
                        <td className="py-3 pr-4 text-right font-mono text-slate-200">
                          {formatValue(m.value, m.unit)}
                        </td>
                        <td className="py-3 text-right">
                          <span
                            className={`inline-flex items-center gap-0.5 text-xs font-semibold ${
                              m.change >= 0 ? "text-emerald-400" : "text-red-400"
                            }`}
                          >
                            {m.change >= 0 ? (
                              <TrendingUp className="h-3 w-3" aria-hidden="true" />
                            ) : (
                              <TrendingDown className="h-3 w-3" aria-hidden="true" />
                            )}
                            {Math.abs(m.change)}%
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {filtered.length === 0 && (
                  <p className="py-8 text-center text-sm text-slate-500">
                    No metrics found matching your filters.
                  </p>
                )}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Breakdown Panels */}
        <div className="space-y-4">
          <Card
            className="border-slate-800 bg-slate-900/50 backdrop-blur-xl"
            data-testid="metrics-traffic-sources"
          >
            <CardHeader>
              <CardTitle className="text-sm text-white">Traffic Sources</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {trafficSources.map((s) => (
                <div key={s.name}>
                  <div className="mb-1 flex justify-between text-xs">
                    <span className="text-slate-300">{s.name}</span>
                    <span className="font-mono text-slate-400">{s.value}%</span>
                  </div>
                  <div className="h-2 overflow-hidden rounded-full bg-slate-800">
                    <div
                      className={`h-full rounded-full ${s.color} transition-all duration-500`}
                      style={{ width: `${s.value}%` }}
                    />
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card
            className="border-slate-800 bg-slate-900/50 backdrop-blur-xl"
            data-testid="metrics-device-breakdown"
          >
            <CardHeader>
              <CardTitle className="text-sm text-white">Devices</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {deviceBreakdown.map((d) => {
                const Icon = d.icon;
                return (
                  <div key={d.name} className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-slate-800">
                      <Icon className="h-4 w-4 text-slate-300" aria-hidden="true" />
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between text-xs">
                        <span className="text-slate-300">{d.name}</span>
                        <span className="font-mono text-slate-400">{d.value}%</span>
                      </div>
                      <div className="mt-1 h-1.5 overflow-hidden rounded-full bg-slate-800">
                        <div
                          className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-blue-500 transition-all duration-500"
                          style={{ width: `${d.value}%` }}
                        />
                      </div>
                    </div>
                  </div>
                );
              })}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Metrics;

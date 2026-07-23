import { useState } from "react";
import {
  BarChart3,
  FileText,
  Download,
  Calendar,
  Plus,
  CheckCircle2,
  Clock,
  AlertCircle,
  FileSpreadsheet,
  FileType2,
  Loader2,
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
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

type ReportStatus = "completed" | "generating" | "scheduled" | "failed";

interface Report {
  id: string;
  name: string;
  type: string;
  dateRange: string;
  status: ReportStatus;
  size: string;
  generatedAt: string;
  format: "PDF" | "CSV" | "XLSX";
}

const initialReports: Report[] = [
  {
    id: "r1",
    name: "Q3 Revenue Analysis",
    type: "Financial",
    dateRange: "Jul 1 – Sep 30, 2025",
    status: "completed",
    size: "2.4 MB",
    generatedAt: "2025-10-15 09:23",
    format: "PDF",
  },
  {
    id: "r2",
    name: "User Acquisition Summary",
    type: "Marketing",
    dateRange: "Sep 1 – Sep 30, 2025",
    status: "completed",
    size: "1.1 MB",
    generatedAt: "2025-10-12 14:08",
    format: "XLSX",
  },
  {
    id: "r3",
    name: "Engagement Deep Dive",
    type: "Product",
    dateRange: "Aug 1 – Oct 15, 2025",
    status: "generating",
    size: "—",
    generatedAt: "2025-10-16 08:00",
    format: "PDF",
  },
  {
    id: "r4",
    name: "Weekly Performance Digest",
    type: "Operations",
    dateRange: "Oct 7 – Oct 13, 2025",
    status: "scheduled",
    size: "—",
    generatedAt: "Recurring weekly",
    format: "CSV",
  },
  {
    id: "r5",
    name: "Churn Cohort Analysis",
    type: "Retention",
    dateRange: "Q1 – Q3 2025",
    status: "failed",
    size: "—",
    generatedAt: "2025-10-14 16:45",
    format: "PDF",
  },
  {
    id: "r6",
    name: "Conversion Funnel Report",
    type: "Marketing",
    dateRange: "Sep 15 – Oct 15, 2025",
    status: "completed",
    size: "3.8 MB",
    generatedAt: "2025-10-15 18:30",
    format: "XLSX",
  },
];

const statusConfig: Record<
  ReportStatus,
  { label: string; color: string; icon: typeof CheckCircle2 }
> = {
  completed: { label: "Completed", color: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20", icon: CheckCircle2 },
  generating: { label: "Generating", color: "bg-blue-500/10 text-blue-400 border-blue-500/20", icon: Loader2 },
  scheduled: { label: "Scheduled", color: "bg-amber-500/10 text-amber-400 border-amber-500/20", icon: Clock },
  failed: { label: "Failed", color: "bg-red-500/10 text-red-400 border-red-500/20", icon: AlertCircle },
};

const formatIcons = {
  PDF: FileType2,
  CSV: FileSpreadsheet,
  XLSX: FileSpreadsheet,
};

const Reports = () => {
  const [reports, setReports] = useState<Report[]>(initialReports);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [generating, setGenerating] = useState(false);
  const [reportName, setReportName] = useState("");
  const [reportType, setReportType] = useState("Financial");
  const [format, setFormat] = useState<"PDF" | "CSV" | "XLSX">("PDF");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  const handleGenerate = () => {
    if (!reportName.trim() || !fromDate || !toDate) return;
    setGenerating(true);
    setTimeout(() => {
      const newReport: Report = {
        id: `r${Date.now()}`,
        name: reportName,
        type: reportType,
        dateRange: `${fromDate} – ${toDate}`,
        status: "generating",
        size: "—",
        generatedAt: new Date().toISOString().slice(0, 16).replace("T", " "),
        format,
      };
      setReports((prev) => [newReport, ...prev]);
      setGenerating(false);
      setDialogOpen(false);
      setReportName("");
      setFromDate("");
      setToDate("");
      // Simulate completion
      setTimeout(() => {
        setReports((prev) =>
          prev.map((r) =>
            r.id === newReport.id
              ? { ...r, status: "completed", size: "1.8 MB" }
              : r
          )
        );
      }, 2500);
    }, 1500);
  };

  const stats = {
    total: reports.length,
    completed: reports.filter((r) => r.status === "completed").length,
    generating: reports.filter((r) => r.status === "generating").length,
    scheduled: reports.filter((r) => r.status === "scheduled").length,
  };

  return (
    <div className="space-y-6" data-testid="reports-page">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <div className="flex items-center gap-2">
            <BarChart3 className="h-5 w-5 text-purple-400" aria-hidden="true" />
            <span className="text-sm font-medium text-purple-300">Reporting</span>
          </div>
          <h1 className="mt-1 text-2xl font-bold text-white">Reports</h1>
          <p className="mt-1 text-sm text-slate-400">
            Generate, schedule, and export detailed analytics reports.
          </p>
        </div>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button
              className="gap-2 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500"
              data-testid="reports-generate-button"
            >
              <Plus className="h-4 w-4" aria-hidden="true" />
              Generate Report
            </Button>
          </DialogTrigger>
          <DialogContent
            className="border-slate-800 bg-slate-900"
            data-testid="reports-generate-dialog"
          >
            <DialogHeader>
              <DialogTitle className="text-white">Generate New Report</DialogTitle>
              <DialogDescription className="text-slate-400">
                Configure your report parameters and export format.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="report-name" className="text-slate-300">
                  Report Name
                </Label>
                <Input
                  id="report-name"
                  aria-label="Report name"
                  placeholder="e.g. Q4 Performance Review"
                  value={reportName}
                  onChange={(e) => setReportName(e.target.value)}
                  className="border-slate-700 bg-slate-950/50 text-slate-200"
                  data-testid="reports-name-input"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-2">
                  <Label htmlFor="report-type" className="text-slate-300">
                    Type
                  </Label>
                  <Select value={reportType} onValueChange={setReportType}>
                    <SelectTrigger
                      id="report-type"
                      className="border-slate-700 bg-slate-950/50 text-slate-200"
                      data-testid="reports-type-select"
                    >
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="border-slate-700 bg-slate-900">
                      <SelectItem value="Financial">Financial</SelectItem>
                      <SelectItem value="Marketing">Marketing</SelectItem>
                      <SelectItem value="Product">Product</SelectItem>
                      <SelectItem value="Operations">Operations</SelectItem>
                      <SelectItem value="Retention">Retention</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="report-format" className="text-slate-300">
                    Format
                  </Label>
                  <Select
                    value={format}
                    onValueChange={(v) => setFormat(v as "PDF" | "CSV" | "XLSX")}
                  >
                    <SelectTrigger
                      id="report-format"
                      className="border-slate-700 bg-slate-950/50 text-slate-200"
                      data-testid="reports-format-select"
                    >
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="border-slate-700 bg-slate-900">
                      <SelectItem value="PDF">PDF</SelectItem>
                      <SelectItem value="CSV">CSV</SelectItem>
                      <SelectItem value="XLSX">Excel (XLSX)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-2">
                  <Label htmlFor="from-date" className="text-slate-300">
                    From
                  </Label>
                  <Input
                    id="from-date"
                    type="date"
                    aria-label="Start date"
                    value={fromDate}
                    onChange={(e) => setFromDate(e.target.value)}
                    className="border-slate-700 bg-slate-950/50 text-slate-200"
                    data-testid="reports-from-date"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="to-date" className="text-slate-300">
                    To
                  </Label>
                  <Input
                    id="to-date"
                    type="date"
                    aria-label="End date"
                    value={toDate}
                    onChange={(e) => setToDate(e.target.value)}
                    className="border-slate-700 bg-slate-950/50 text-slate-200"
                    data-testid="reports-to-date"
                  />
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setDialogOpen(false)}
                className="border-slate-700 bg-transparent text-slate-300 hover:bg-slate-800"
                data-testid="reports-cancel-button"
              >
                Cancel
              </Button>
              <Button
                onClick={handleGenerate}
                disabled={generating || !reportName.trim() || !fromDate || !toDate}
                className="gap-2 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500"
                data-testid="reports-confirm-generate"
              >
                {generating ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
                    Generating...
                  </>
                ) : (
                  <>
                    <FileText className="h-4 w-4" aria-hidden="true" />
                    Generate
                  </>
                )}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {[
          { label: "Total Reports", value: stats.total, icon: FileText, color: "text-indigo-400" },
          { label: "Completed", value: stats.completed, icon: CheckCircle2, color: "text-emerald-400" },
          { label: "In Progress", value: stats.generating, icon: Loader2, color: "text-blue-400" },
          { label: "Scheduled", value: stats.scheduled, icon: Clock, color: "text-amber-400" },
        ].map((s) => {
          const Icon = s.icon;
          return (
            <Card
              key={s.label}
              className="border-slate-800 bg-slate-900/50 backdrop-blur-xl"
              data-testid={`reports-stat-${s.label.replace(/\s/g, "-").toLowerCase()}`}
            >
              <CardContent className="flex items-center gap-3 p-4">
                <Icon className={`h-8 w-8 ${s.color}`} aria-hidden="true" />
                <div>
                  <p className="text-2xl font-bold text-white">{s.value}</p>
                  <p className="text-xs text-slate-400">{s.label}</p>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Reports Table */}
      <Card
        className="border-slate-800 bg-slate-900/50 backdrop-blur-xl"
        data-testid="reports-table"
      >
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-white">Report History</CardTitle>
              <CardDescription className="text-slate-400">
                All generated and scheduled reports
              </CardDescription>
            </div>
            <Calendar className="h-5 w-5 text-slate-500" aria-hidden="true" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-800 text-left text-xs uppercase tracking-wider text-slate-500">
                  <th className="pb-3 pr-4 font-medium">Report</th>
                  <th className="pb-3 pr-4 font-medium">Type</th>
                  <th className="pb-3 pr-4 font-medium">Date Range</th>
                  <th className="pb-3 pr-4 font-medium">Status</th>
                  <th className="pb-3 pr-4 font-medium">Size</th>
                  <th className="pb-3 font-medium text-right">Action</th>
                </tr>
              </thead>
              <tbody>
                {reports.map((r) => {
                  const StatusIcon = statusConfig[r.status].icon;
                  const FormatIcon = formatIcons[r.format];
                  return (
                    <tr
                      key={r.id}
                      className="border-b border-slate-800/50 transition-colors hover:bg-slate-800/30"
                    >
                      <td className="py-3 pr-4">
                        <div className="flex items-center gap-3">
                          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-slate-800">
                            <FormatIcon className="h-4 w-4 text-slate-300" aria-hidden="true" />
                          </div>
                          <div>
                            <p className="font-medium text-white">{r.name}</p>
                            <p className="text-xs text-slate-500">{r.format} · {r.generatedAt}</p>
                          </div>
                        </div>
                      </td>
                      <td className="py-3 pr-4">
                        <Badge
                          variant="outline"
                          className="border-slate-700 bg-slate-800/50 text-xs text-slate-300"
                        >
                          {r.type}
                        </Badge>
                      </td>
                      <td className="py-3 pr-4 text-slate-300">{r.dateRange}</td>
                      <td className="py-3 pr-4">
                        <Badge
                          variant="outline"
                          className={`border text-xs ${statusConfig[r.status].color}`}
                        >
                          <StatusIcon
                            className={`mr-1 h-3 w-3 ${r.status === "generating" ? "animate-spin" : ""}`}
                            aria-hidden="true"
                          />
                          {statusConfig[r.status].label}
                        </Badge>
                      </td>
                      <td className="py-3 pr-4 font-mono text-xs text-slate-400">{r.size}</td>
                      <td className="py-3 text-right">
                        {r.status === "completed" ? (
                          <Button
                            variant="ghost"
                            size="sm"
                            className="gap-1 text-indigo-400 hover:bg-indigo-500/10 hover:text-indigo-300"
                            data-testid={`reports-download-${r.id}`}
                          >
                            <Download className="h-3.5 w-3.5" aria-hidden="true" />
                            Download
                          </Button>
                        ) : (
                          <span className="text-xs text-slate-600">—</span>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Reports;

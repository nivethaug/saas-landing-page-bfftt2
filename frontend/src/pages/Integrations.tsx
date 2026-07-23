import { useState, useMemo } from "react";
import {
  Plug,
  Search,
  Check,
  X,
  Plus,
  Settings,
  Zap,
  ExternalLink,
  Loader2,
  Webhook,
  Database,
  Cloud,
  MessageSquare,
  Mail,
  CreditCard,
  Shield,
  GitBranch,
  BarChart,
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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface Integration {
  id: string;
  name: string;
  category: string;
  description: string;
  icon: typeof Zap;
  accent: string;
  connected: boolean;
  popular?: boolean;
}

const catalog: Integration[] = [
  { id: "slack", name: "Slack", category: "Communication", description: "Send alerts and summaries to your Slack channels.", icon: MessageSquare, accent: "from-purple-500 to-pink-500", connected: true, popular: true },
  { id: "stripe", name: "Stripe", category: "Payments", description: "Sync revenue data and subscription events.", icon: CreditCard, accent: "from-indigo-500 to-blue-500", connected: true, popular: true },
  { id: "hubspot", name: "HubSpot", category: "CRM", description: "Push leads and contacts to your CRM automatically.", icon: Shield, accent: "from-orange-500 to-red-500", connected: false, popular: true },
  { id: "segment", name: "Segment", category: "Analytics", description: "Route customer data through Segment's pipeline.", icon: BarChart, accent: "from-emerald-500 to-teal-500", connected: true },
  { id: "github", name: "GitHub", category: "Developer", description: "Track deployments and link pull requests to metrics.", icon: GitBranch, accent: "from-slate-500 to-slate-700", connected: false },
  { id: "sendgrid", name: "SendGrid", category: "Email", description: "Trigger transactional and marketing emails.", icon: Mail, accent: "from-blue-500 to-cyan-500", connected: false },
  { id: "s3", name: "Amazon S3", category: "Storage", description: "Export reports and raw data to your S3 buckets.", icon: Cloud, accent: "from-amber-500 to-orange-500", connected: false },
  { id: "postgres", name: "PostgreSQL", category: "Database", description: "Connect directly to your warehouse for live queries.", icon: Database, accent: "from-blue-600 to-indigo-600", connected: true },
  { id: "webhooks", name: "Custom Webhooks", category: "Developer", description: "Receive real-time event payloads to any endpoint.", icon: Webhook, accent: "from-fuchsia-500 to-purple-500", connected: false, popular: true },
];

const categoryColors: Record<string, string> = {
  Communication: "bg-purple-500/10 text-purple-400 border-purple-500/20",
  Payments: "bg-indigo-500/10 text-indigo-400 border-indigo-500/20",
  CRM: "bg-orange-500/10 text-orange-400 border-orange-500/20",
  Analytics: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
  Developer: "bg-slate-500/10 text-slate-300 border-slate-500/20",
  Email: "bg-blue-500/10 text-blue-400 border-blue-500/20",
  Storage: "bg-amber-500/10 text-amber-400 border-amber-500/20",
  Database: "bg-indigo-500/10 text-indigo-400 border-indigo-500/20",
};

const Integrations = () => {
  const [integrations, setIntegrations] = useState<Integration[]>(catalog);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [configuring, setConfiguring] = useState<Integration | null>(null);
  const [connecting, setConnecting] = useState(false);

  const categories = useMemo(
    () => ["All", ...Array.from(new Set(catalog.map((i) => i.category)))],
    []
  );

  const filtered = useMemo(() => {
    return integrations.filter((i) => {
      const matchSearch =
        i.name.toLowerCase().includes(search.toLowerCase()) ||
        i.description.toLowerCase().includes(search.toLowerCase());
      const matchCat = category === "All" || i.category === category;
      return matchSearch && matchCat;
    });
  }, [integrations, search, category]);

  const connectedCount = integrations.filter((i) => i.connected).length;

  const handleConnect = (integration: Integration) => {
    setConfiguring(integration);
  };

  const confirmConnect = () => {
    if (!configuring) return;
    setConnecting(true);
    setTimeout(() => {
      setIntegrations((prev) =>
        prev.map((i) =>
          i.id === configuring.id ? { ...i, connected: !i.connected } : i
        )
      );
      setConnecting(false);
      setConfiguring(null);
    }, 1400);
  };

  const handleToggle = (id: string) => {
    setIntegrations((prev) =>
      prev.map((i) => (i.id === id ? { ...i, connected: !i.connected } : i))
    );
  };

  return (
    <div className="space-y-6" data-testid="integrations-page">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <div className="flex items-center gap-2">
            <Plug className="h-5 w-5 text-fuchsia-400" aria-hidden="true" />
            <span className="text-sm font-medium text-fuchsia-300">Connect</span>
          </div>
          <h1 className="mt-1 text-2xl font-bold text-white">Integrations</h1>
          <p className="mt-1 text-sm text-slate-400">
            Connect FlowAnalytics to your favorite tools and services.
          </p>
        </div>
        <Badge
          variant="outline"
          className="border-slate-700 bg-slate-900/50 px-3 py-1.5 text-sm text-slate-300"
          data-testid="integrations-connected-count"
        >
          <Check className="mr-1.5 h-3.5 w-3.5 text-emerald-400" aria-hidden="true" />
          {connectedCount} active
        </Badge>
      </div>

      {/* Filters */}
      <Card
        className="border-slate-800 bg-slate-900/50 backdrop-blur-xl"
        data-testid="integrations-filters"
      >
        <CardContent className="flex flex-col gap-3 p-4 md:flex-row md:items-center">
          <div className="relative flex-1">
            <Search
              className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500"
              aria-hidden="true"
            />
            <Input
              aria-label="Search integrations"
              placeholder="Search integrations..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="border-slate-700 bg-slate-950/50 pl-9 text-slate-200 placeholder:text-slate-500"
              data-testid="integrations-search-input"
            />
          </div>
          <Select value={category} onValueChange={setCategory}>
            <SelectTrigger
              className="w-full border-slate-700 bg-slate-950/50 text-slate-200 md:w-52"
              aria-label="Filter by category"
              data-testid="integrations-category-select"
            >
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
        </CardContent>
      </Card>

      {/* Integration Grid */}
      <div
        className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"
        data-testid="integrations-grid"
      >
        {filtered.map((integration) => {
          const Icon = integration.icon;
          return (
            <Card
              key={integration.id}
              className="group relative overflow-hidden border-slate-800 bg-slate-900/50 backdrop-blur-xl transition-all duration-300 hover:border-fuchsia-500/40 hover:shadow-lg hover:shadow-fuchsia-500/10"
              data-testid={`integration-card-${integration.id}`}
            >
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div
                    className={`rounded-xl bg-gradient-to-br ${integration.accent} p-2.5 transition-transform duration-300 group-hover:scale-110`}
                  >
                    <Icon className="h-5 w-5 text-white" aria-hidden="true" />
                  </div>
                  {integration.popular && (
                    <Badge
                      variant="outline"
                      className="border-amber-500/30 bg-amber-500/10 text-xs text-amber-400"
                    >
                      <Zap className="mr-1 h-2.5 w-2.5" aria-hidden="true" />
                      Popular
                    </Badge>
                  )}
                </div>
                <CardTitle className="mt-3 flex items-center gap-2 text-white">
                  {integration.name}
                  {integration.connected && (
                    <span className="flex items-center gap-1 text-xs font-normal text-emerald-400">
                      <Check className="h-3 w-3" aria-hidden="true" />
                      Connected
                    </span>
                  )}
                </CardTitle>
                <CardDescription className="text-slate-400">
                  {integration.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <Badge
                    variant="outline"
                    className={`text-xs ${categoryColors[integration.category]}`}
                  >
                    {integration.category}
                  </Badge>
                  {integration.connected ? (
                    <div className="flex items-center gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-slate-400 hover:bg-slate-800 hover:text-white"
                        aria-label={`Configure ${integration.name}`}
                        data-testid={`integration-settings-${integration.id}`}
                      >
                        <Settings className="h-3.5 w-3.5" aria-hidden="true" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleToggle(integration.id)}
                        className="gap-1 border-red-500/30 bg-red-500/5 text-red-400 hover:bg-red-500/10 hover:text-red-300"
                        data-testid={`integration-disconnect-${integration.id}`}
                      >
                        <X className="h-3.5 w-3.5" aria-hidden="true" />
                        Disconnect
                      </Button>
                    </div>
                  ) : (
                    <Button
                      size="sm"
                      onClick={() => handleConnect(integration)}
                      className="gap-1 bg-gradient-to-r from-fuchsia-600 to-purple-600 hover:from-fuchsia-500 hover:to-purple-500"
                      data-testid={`integration-connect-${integration.id}`}
                    >
                      <Plus className="h-3.5 w-3.5" aria-hidden="true" />
                      Connect
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {filtered.length === 0 && (
        <Card className="border-slate-800 bg-slate-900/50">
          <CardContent className="py-16 text-center">
            <p className="text-sm text-slate-400">
              No integrations found matching your search.
            </p>
          </CardContent>
        </Card>
      )}

      {/* Connect Dialog */}
      <Dialog
        open={!!configuring}
        onOpenChange={(open) => !open && setConfiguring(null)}
      >
        <DialogContent
          className="border-slate-800 bg-slate-900"
          data-testid="integrations-connect-dialog"
        >
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-white">
              {configuring && (
                <>
                  <div
                    className={`rounded-lg bg-gradient-to-br ${configuring.accent} p-1.5`}
                  >
                    <configuring.icon className="h-4 w-4 text-white" aria-hidden="true" />
                  </div>
                  Connect {configuring.name}
                </>
              )}
            </DialogTitle>
            <DialogDescription className="text-slate-400">
              {configuring?.description} You'll be redirected to authorize access.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-3 py-4">
            <div className="rounded-lg border border-slate-800 bg-slate-950/50 p-4">
              <div className="flex items-start gap-3">
                <Shield className="mt-0.5 h-4 w-4 text-emerald-400" aria-hidden="true" />
                <div className="text-sm">
                  <p className="font-medium text-white">Secure OAuth Flow</p>
                  <p className="mt-1 text-slate-400">
                    FlowAnalytics requests only the permissions needed. You can revoke access anytime.
                  </p>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2 text-xs text-slate-500">
              <ExternalLink className="h-3 w-3" aria-hidden="true" />
              <span>Learn more about data sharing in our privacy docs</span>
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setConfiguring(null)}
              className="border-slate-700 bg-transparent text-slate-300 hover:bg-slate-800"
              data-testid="integrations-connect-cancel"
            >
              Cancel
            </Button>
            <Button
              onClick={confirmConnect}
              disabled={connecting}
              className="gap-2 bg-gradient-to-r from-fuchsia-600 to-purple-600 hover:from-fuchsia-500 hover:to-purple-500"
              data-testid="integrations-connect-confirm"
            >
              {connecting ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
                  Connecting...
                </>
              ) : (
                <>
                  <Plug className="h-4 w-4" aria-hidden="true" />
                  Authorize & Connect
                </>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Integrations;

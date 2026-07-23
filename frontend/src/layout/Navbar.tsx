import { useState } from "react";
import { NavLink, Link } from "react-router-dom";
import { LayoutDashboard, BarChart3, FileText, Plug, Menu, X, Activity } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetTitle, SheetDescription } from "@/components/ui/sheet";

const navItems = [
  { to: "/", label: "Dashboard", icon: LayoutDashboard, testId: "navbar-link-dashboard" },
  { to: "/metrics", label: "Metrics", icon: BarChart3, testId: "navbar-link-metrics" },
  { to: "/reports", label: "Reports", icon: FileText, testId: "navbar-link-reports" },
  { to: "/integrations", label: "Integrations", icon: Plug, testId: "navbar-link-integrations" },
];

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  const linkClass = ({ isActive }: { isActive: boolean }) =>
    `relative flex items-center gap-2 px-3 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
      isActive
        ? "text-white bg-slate-800/60"
        : "text-slate-400 hover:text-white hover:bg-slate-800/40"
    }`;

  return (
    <header className="sticky top-0 z-50 border-b border-slate-800 bg-slate-950/80 backdrop-blur-xl">
      <nav
        className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 md:px-6"
        aria-label="Main navigation"
      >
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2" data-testid="navbar-logo">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-indigo-500 to-blue-500">
            <Activity className="h-4 w-4 text-white" aria-hidden="true" />
          </span>
          <span className="text-lg font-bold tracking-tight text-white">
            Flow<span className="text-indigo-400">Analytics</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden items-center gap-1 md:flex">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink key={item.to} to={item.to} className={linkClass} data-testid={item.testId} end={item.to === "/"}>
                <span className="flex items-center gap-2">
                  <Icon className="h-4 w-4" aria-hidden="true" />
                  {item.label}
                </span>
              </NavLink>
            );
          })}
        </div>

        {/* CTA + Mobile */}
        <div className="flex items-center gap-2">
          <Button
            className="hidden bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-500 hover:to-blue-500 md:inline-flex"
            data-testid="navbar-cta-button"
          >
            Get Started
          </Button>
          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="text-slate-300 md:hidden"
                aria-label="Open navigation menu"
                data-testid="sidebar-toggle-button"
              >
                <Menu className="h-5 w-5" aria-hidden="true" />
              </Button>
            </SheetTrigger>
            <SheetContent
              side="right"
              className="w-72 border-slate-800 bg-slate-950"
              data-testid="navbar-mobile-menu"
            >
              <SheetTitle className="sr-only">Navigation menu</SheetTitle>
              <SheetDescription className="sr-only">
                Main navigation links for FlowAnalytics
              </SheetDescription>
              <div className="mt-6 flex items-center justify-between">
                <span className="flex items-center gap-2">
                  <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-br from-indigo-500 to-blue-500">
                    <Activity className="h-3.5 w-3.5 text-white" aria-hidden="true" />
                  </span>
                  <span className="text-base font-bold text-white">
                    Flow<span className="text-indigo-400">Analytics</span>
                  </span>
                </span>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-slate-400"
                  aria-label="Close menu"
                  onClick={() => setMobileOpen(false)}
                  data-testid="navbar-close-button"
                >
                  <X className="h-5 w-5" aria-hidden="true" />
                </Button>
              </div>
              <div className="mt-8 flex flex-col gap-1">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <NavLink
                      key={item.to}
                      to={item.to}
                      end={item.to === "/"}
                      onClick={() => setMobileOpen(false)}
                      className={({ isActive }) =>
                        `flex items-center gap-3 rounded-lg px-3 py-3 text-sm font-medium transition-colors ${
                          isActive
                            ? "bg-slate-800/60 text-white"
                            : "text-slate-400 hover:bg-slate-800/40 hover:text-white"
                        }`
                      }
                      data-testid={`mobile-${item.testId}`}
                    >
                      <span className="flex items-center gap-3">
                        <Icon className="h-4 w-4" aria-hidden="true" />
                        {item.label}
                      </span>
                    </NavLink>
                  );
                })}
                <Button
                  className="mt-4 bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-500 hover:to-blue-500"
                  data-testid="navbar-mobile-cta"
                >
                  Get Started
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;

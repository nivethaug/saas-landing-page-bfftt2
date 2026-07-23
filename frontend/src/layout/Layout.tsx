import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";

/**
 * Layout component - Main application layout wrapper
 *
 * Renders the Navbar and a scrollable main content area containing <Outlet />.
 */
const Layout = () => {
  return (
    <div className="flex h-screen w-full flex-col overflow-hidden bg-slate-950">
      <Navbar />
      <main className="flex-1 overflow-y-auto">
        <div className="mx-auto max-w-7xl px-4 py-6 md:px-6 md:py-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default Layout;

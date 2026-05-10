import { NavLink, Outlet } from "react-router-dom";

export default function DashboardLayout() {
  return (
    <div className="flex min-h-screen">

      {/* SIDEBAR */}
      <div className="w-64 bg-gray-900 text-white p-4 space-y-4">

        <h1 className="text-xl font-bold">
          Opportunity Hub
        </h1>

        <nav className="space-y-2 mt-6">

          <NavLink to="/dashboard" className="block hover:text-blue-400">
            Dashboard
          </NavLink>

          <NavLink to="/leads" className="block hover:text-blue-400">
            Leads
          </NavLink>

          <NavLink to="/skills" className="block hover:text-blue-400">
            Skills
          </NavLink>

          <NavLink to="/reseller" className="block hover:text-blue-400">
            Reseller
          </NavLink>

          <NavLink to="/admin" className="block hover:text-blue-400">
            Admin
          </NavLink>

        </nav>

      </div>

      {/* MAIN AREA */}
      <div className="flex-1 bg-gray-50 p-6">

        <Outlet />

      </div>

    </div>
  );
}

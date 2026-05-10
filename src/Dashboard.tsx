import { NavLink, Outlet } from "react-router-dom";

export default function DashboardLayout() {
  return (
    <div className="flex min-h-screen bg-gray-100">

      {/* SIDEBAR */}
      <aside className="w-64 bg-gray-900 text-white p-5">

        <h1 className="text-xl font-bold mb-8">
          Opportunity Hub
        </h1>

        <nav className="flex flex-col gap-4">

          <NavLink
            to="/dashboard"
            className="block px-2 py-1 rounded hover:bg-gray-800"
          >
            Dashboard
          </NavLink>

          <NavLink
            to="/skills"
            className="block px-2 py-1 rounded hover:bg-gray-800"
          >
            Skills
          </NavLink>

          <NavLink
            to="/leads"
            className="block px-2 py-1 rounded hover:bg-gray-800"
          >
            Leads
          </NavLink>

          <NavLink
            to="/reseller"
            className="block px-2 py-1 rounded hover:bg-gray-800"
          >
            Reseller
          </NavLink>

          <NavLink
            to="/admin"
            className="block px-2 py-1 rounded hover:bg-gray-800"
          >
            Admin
          </NavLink>

          <NavLink
            to="/contact"
            className="block px-2 py-1 rounded hover:bg-gray-800"
          >
            Contact Us
          </NavLink>

        </nav>

      </aside>

      {/* MAIN CONTENT */}
      <main className="flex-1 p-6">

        <Outlet />

      </main>

    </div>
  );
}

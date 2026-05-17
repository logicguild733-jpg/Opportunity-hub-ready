import { NavLink, Outlet } from "react-router-dom";

export default function DashboardLayout() {
  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>

      {/* Sidebar */}
      <div style={{ width: 220, background: "#111", color: "#fff", padding: 20 }}>
        <h2>Opportunity Hub 🚀</h2>

        <nav style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          <NavLink to="/dashboard">Dashboard</NavLink>
          <NavLink to="/dashboard/skills">Skills</NavLink>
          <NavLink to="/dashboard/leads">Leads</NavLink>
          <NavLink to="/dashboard/reseller">Reseller</NavLink>
        </nav>
      </div>

      {/* Content */}
      <div style={{ flex: 1, padding: 20 }}>
        <Outlet />
      </div>

    </div>
  );
}

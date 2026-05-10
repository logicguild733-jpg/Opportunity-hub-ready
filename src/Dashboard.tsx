import { NavLink, Outlet } from "react-router-dom";

export default function DashboardLayout() {
  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>

      {/* SIDEBAR */}
      <div style={{
        width: "220px",
        background: "#111",
        color: "white",
        padding: "20px"
      }}>

        <h2 style={{ marginBottom: "20px" }}>
          Opportunity Hub
        </h2>

        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>

          <NavLink to="/dashboard" style={{ color: "white", textDecoration: "none" }}>
            Dashboard
          </NavLink>

          <NavLink to="/skills" style={{ color: "white", textDecoration: "none" }}>
            Skills
          </NavLink>

          <NavLink to="/leads" style={{ color: "white", textDecoration: "none" }}>
            Leads
          </NavLink>

          <NavLink to="/reseller" style={{ color: "white", textDecoration: "none" }}>
            Reseller
          </NavLink>

          <NavLink to="/admin" style={{ color: "white", textDecoration: "none" }}>
            Admin
          </NavLink>

        </div>

      </div>

      {/* CONTENT */}
      <div style={{ flex: 1, padding: 20 }}>
        <Outlet />
      </div>

    </div>
  );
}

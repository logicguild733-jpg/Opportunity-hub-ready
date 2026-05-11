import { NavLink, Outlet } from "react-router-dom";

export default function DashboardLayout() {
  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>

      {/* SIDEBAR */}
      <div style={{
        width: "240px",
        background: "#0f172a",
        color: "white",
        padding: "20px",
        display: "flex",
        flexDirection: "column"
      }}>

        <h2 style={{ marginBottom: "20px", fontWeight: "bold" }}>
          Opportunity Hub 🚀
        </h2>

        <div style={{
          display: "flex",
          flexDirection: "column",
          gap: "12px"
        }}>

          <NavLink to="/dashboard" style={{ color: "white", textDecoration: "none" }}>
            Dashboard
          </NavLink>

          <NavLink to="/dashboard/skills" style={{ color: "white", textDecoration: "none" }}>
            Skills
          </NavLink>

          <NavLink to="/dashboard/leads" style={{ color: "white", textDecoration: "none" }}>
            Leads
          </NavLink>

          <NavLink to="/dashboard/reseller" style={{ color: "white", textDecoration: "none" }}>
            Reseller
          </NavLink>

          <NavLink to="/dashboard/reffer" style={{ color: "white", textDecoration: "none" }}>
            Reffer
          </NavLink>

          <NavLink to="/dashboard/contact" style={{ color: "white", textDecoration: "none" }}>
            Contact Us
          </NavLink>

          <NavLink to="/dashboard/policy" style={{ color: "white", textDecoration: "none" }}>
            Policy
          </NavLink>

          <NavLink to="/dashboard/admin" style={{ color: "white", textDecoration: "none" }}>
            Admin
          </NavLink>

        </div>

      </div>

      {/* MAIN CONTENT */}
      <div style={{ flex: 1, padding: 20 }}>
        <Outlet />
      </div>

    </div>
  );
}

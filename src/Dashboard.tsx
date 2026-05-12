import { NavLink, Outlet } from "react-router-dom";

const linkStyle = {
  color: "white",
  textDecoration: "none",
  padding: "8px 10px",
  borderRadius: "6px",
};

export default function DashboardLayout() {
  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>

      {/* SIDEBAR */}
      <div
        style={{
          width: "240px",
          background: "#0f172a",
          color: "white",
          padding: "20px",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* BRAND */}
        <h2 style={{ fontSize: "18px", fontWeight: "bold", marginBottom: "25px" }}>
          Opportunity Hub 🚀
        </h2>

        {/* NAV */}
        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>

          <NavLink to="/dashboard" style={linkStyle}>
            Dashboard
          </NavLink>

          <NavLink to="/dashboard/skills" style={linkStyle}>
            Skills
          </NavLink>

          <NavLink to="/dashboard/leads" style={linkStyle}>
            Leads
          </NavLink>

          <NavLink to="/dashboard/reseller" style={linkStyle}>
            Reseller
          </NavLink>

          <NavLink to="/dashboard/reffer" style={linkStyle}>
            Reffer
          </NavLink>

          <NavLink to="/dashboard/contact" style={linkStyle}>
            Contact Us
          </NavLink>

          <NavLink to="/dashboard/policy" style={linkStyle}>
            Policy
          </NavLink>

          <NavLink to="/dashboard/admin" style={linkStyle}>
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

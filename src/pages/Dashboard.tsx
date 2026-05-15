import { NavLink, Outlet } from "react-router-dom";

const linkStyle = ({ isActive }: { isActive: boolean }) => ({
  color: "white",
  textDecoration: "none",
  padding: "8px 10px",
  borderRadius: "6px",
  background: isActive ? "#1e293b" : "transparent",
});

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
        <h2 style={{ fontSize: "18px", fontWeight: "bold", marginBottom: "25px" }}>
          Opportunity Hub 🚀
        </h2>

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

          {/* ✅ FIXED */}
          <NavLink to="/dashboard/referral" style={linkStyle}>
            Referral
          </NavLink>

          <NavLink to="/dashboard/contact" style={linkStyle}>
            Contact Us
          </NavLink>

          {/* ✅ FIXED */}
          <NavLink to="/dashboard/privacy-policy" style={linkStyle}>
            Privacy Policy
          </NavLink>

          <NavLink to="/dashboard/subscription-policy" style={linkStyle}>
            Subscription Policy
          </NavLink>

          <NavLink to="/dashboard/admin" style={linkStyle}>
            Admin
          </NavLink>

        </div>
      </div>

      {/* MAIN */}
      <div style={{ flex: 1, padding: 20 }}>
        <Outlet />
      </div>

    </div>
  );
}

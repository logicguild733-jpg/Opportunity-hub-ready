<div
  style={{
    width: "240px",
    background: "#0f172a",
    color: "white",
    padding: "20px",
    display: "flex",
    flexDirection: "column",
    height: "100vh",
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

    <NavLink to="/skills" style={linkStyle}>
      Skills
    </NavLink>

    <NavLink to="/leads" style={linkStyle}>
      Leads
    </NavLink>

    <NavLink to="/reseller" style={linkStyle}>
      Reseller
    </NavLink>

    <NavLink to="/reffer" style={linkStyle}>
      Reffer
    </NavLink>

    <NavLink to="/contact" style={linkStyle}>
      Contact Us
    </NavLink>

    <NavLink to="/policy" style={linkStyle}>
      Policy
    </NavLink>

    <NavLink to="/admin" style={linkStyle}>
      Admin
    </NavLink>

  </div>
</div>

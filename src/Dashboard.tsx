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

  <div style={{
    display: "flex",
    flexDirection: "column",
    gap: "12px"
  }}>

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

    {/* NEW ADDITIONS */}
    <NavLink to="/reffer" style={{ color: "white", textDecoration: "none" }}>
      Reffer
    </NavLink>

    <NavLink to="/contact" style={{ color: "white", textDecoration: "none" }}>
      Contact Us
    </NavLink>

    <NavLink to="/policy" style={{ color: "white", textDecoration: "none" }}>
      Policy
    </NavLink>

    <NavLink to="/admin" style={{ color: "white", textDecoration: "none" }}>
      Admin
    </NavLink>

  </div>

</div>

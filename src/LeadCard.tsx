import { useState } from "react";

export default function LeadCard({ lead }: { lead: any }) {
  const [showContact, setShowContact] = useState(false);

  const copyContact = () => {
    const text = [lead?.contact_email, lead?.contact_phone].filter(Boolean).join(" | ");
    if (!text) return alert("No contact info");

    // Try clipboard, fallback to prompt
    navigator.clipboard?.writeText(text)
      .then(() => alert("Copied!"))
      .catch(() => prompt("Copy manually:", text));
  };

  return (
    <div style={{
      border: "1px solid #ccc",
      padding: "15px",
      borderRadius: "8px",
      marginBottom: "10px",
      fontFamily: "Inter, sans-serif"
    }}>
      <h3>{lead?.client_name || "No Name"}</h3>
      <p>{lead?.service_needed || "Service not specified"}</p>
      <p>{lead?.description || "No description"}</p>

      <button
        style={{ marginTop: "5px" }}
        onClick={() => setShowContact(!showContact)}
      >
        {showContact ? "Hide Contact" : "Show Contact"}
      </button>

      {showContact && (
        <div style={{ marginTop: "5px" }}>
          {lead?.contact_email && <p>Email: {lead.contact_email}</p>}
          {lead?.contact_phone && <p>Phone: {lead.contact_phone}</p>}
          <button onClick={copyContact}>Copy Contact Info</button>
        </div>
      )}
    </div>
  );
}

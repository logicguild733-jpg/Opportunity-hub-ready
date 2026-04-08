import { useState } from "react";

export default function LeadCard({ lead }: { lead: any }) {
  const [showContact, setShowContact] = useState(false);

  const copyContact = () => {
    const text = [lead.contact_email, lead.contact_phone].filter(Boolean).join(" | ");
    if (!text) return alert("No contact info");
    navigator.clipboard.writeText(text).then(() => alert("Copied!"));
  };

  return (
    <div style={{ border: "1px solid #ccc", padding: "15px", borderRadius: "8px", marginBottom: "10px" }}>
      <h3>{lead.client_name}</h3>
      <p>{lead.service_needed}</p>
      <p>{lead.description}</p>
      <button onClick={() => setShowContact(!showContact)}>
        {showContact ? "Hide Contact" : "Show Contact"}
      </button>
      {showContact && (
        <div style={{ marginTop: "5px" }}>
          {lead.contact_email && <p>Email: {lead.contact_email}</p>}
          {lead.contact_phone && <p>Phone: {lead.contact_phone}</p>}
          <button onClick={copyContact}>Copy Contact Info</button>
        </div>
      )}
    </div>
  );
}

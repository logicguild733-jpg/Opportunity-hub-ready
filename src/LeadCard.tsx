import { motion } from "framer-motion";

export default function LeadCard({ lead }: any) {
  // 🔒 LOCKED LEAD
  if (lead?.isLocked) {
    return (
      <motion.div
        className="p-4 border rounded-2xl bg-muted/40 opacity-70"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <p className="font-semibold text-lg">🔒 Locked Lead</p>

        <p className="text-sm text-muted-foreground mt-1">
          Upgrade to view full details and contact this client.
        </p>

        <p className="text-xs text-muted-foreground mt-3">
          More opportunities available 🚀
        </p>
      </motion.div>
    );
  }

  // ✅ NORMAL LEAD
  return (
    <motion.div
      className="p-4 border rounded-2xl bg-background hover:shadow-md transition"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <h3 className="font-semibold text-lg">
        {lead.client_name || "Client"}
      </h3>

      <p className="text-sm text-muted-foreground mt-1">
        {lead.service_needed || lead.tags}
      </p>

      {lead.description && (
        <p className="text-sm mt-2 line-clamp-3">
          {lead.description}
        </p>
      )}

      <div className="mt-3 text-xs text-muted-foreground">
        {lead.country || ""} {lead.city ? `• ${lead.city}` : ""}
      </div>

      {lead.lead_quality && (
        <div className="mt-2 text-xs font-semibold">
          Quality: {lead.lead_quality}
        </div>
      )}
    </motion.div>
  );
}

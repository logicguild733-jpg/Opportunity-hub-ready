import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Search } from "lucide-react";

import { useLeads, useAllLeads, useLeadUsage } from "@/hooks/use-leads";
import { useAuthMe } from "@/hooks/use-auth";

import LeadCard from "@/LeadCard";
import { Input } from "@/components/ui";
import { getPlanLimit } from "@/lib/planLimits";

export default function Dashboard() {
  const { data: user } = useAuthMe();
  const { data: matchedResponse, isLoading: leadsLoading } = useLeads();
  const { data: allResponse, isLoading: allLoading } = useAllLeads();
  const { data: usageData } = useLeadUsage();

  const [search, setSearch] = useState("");
  const [showAll] = useState(true);

  // ================= ADMIN CHECK =================
  const isAdmin =
    user?.role === "admin" ||
    user?.email === "logicguild733@gmail.com";

  // ================= PLAN =================
  const plan = (user as any)?.subscription_plan || "basic";
  const limit = getPlanLimit(plan);

  // gold = unlimited
  const unlockLimit = limit === 100 ? null : limit;

  // ================= LEADS =================
  const usage =
    usageData || (showAll ? allResponse?.usage : matchedResponse?.usage);

  const activeLeads = showAll
    ? allResponse?.leads || []
    : matchedResponse?.leads || [];

  const isLoading = showAll ? allLoading : leadsLoading;

  // ================= SEARCH FILTER =================
  const filteredLeads = useMemo(() => {
    if (!activeLeads) return [];

    const q = search.toLowerCase().trim();

    return activeLeads.filter((lead: any) => {
      const text = `
        ${lead.client_name || ""}
        ${lead.description || ""}
        ${lead.service_needed || ""}
        ${lead.industry || ""}
        ${lead.city || ""}
        ${lead.country || ""}
      `.toLowerCase();

      return q === "" || text.includes(q);
    });
  }, [activeLeads, search]);

  // ================= INACTIVE ACCOUNT =================
  const isInactive = user?.subscription_status === "inactive";

  if (isInactive) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-center">
        <h2 className="text-2xl font-bold">Subscription Inactive</h2>
        <p className="text-muted-foreground mt-2">
          Please contact support to renew your subscription.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">

      {/* HEADER */}
      <div className="flex justify-between items-center">
        <div>
          <motion.h1 className="text-3xl font-bold">
            Welcome {user?.name || "User"}
          </motion.h1>

          <p className="text-muted-foreground">
            {isAdmin ? "Admin Dashboard" : "Your Leads Dashboard"}
          </p>
        </div>

        {isAdmin && (
          <div className="bg-red-100 text-red-700 px-3 py-1 rounded-lg text-sm font-semibold">
            ADMIN MODE
          </div>
        )}
      </div>

      {/* PLAN INFO */}
      <div className="text-sm text-muted-foreground">
        Plan: <b>{plan}</b> | Limit:{" "}
        <b>{unlockLimit === null ? "Unlimited" : unlockLimit}</b>
        {usage?.used !== undefined && (
          <> | Used: <b>{usage.used}</b></>
        )}
      </div>

      {/* SEARCH */}
      <div className="relative">
        <Search className="absolute left-3 top-2.5 text-muted-foreground" size={16} />
        <Input
          className="pl-9"
          placeholder="Search leads..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* LEADS */}
      {isLoading ? (
        <p className="text-center text-muted-foreground">Loading leads...</p>
      ) : filteredLeads.length === 0 ? (
        <p className="text-center text-muted-foreground">
          No leads found
        </p>
      ) : (
        <div className="grid md:grid-cols-3 gap-4">
          {filteredLeads.map((lead: any, i: number) => (
            <LeadCard key={i} lead={lead} />
          ))}
        </div>
      )}
    </div>
  );
}

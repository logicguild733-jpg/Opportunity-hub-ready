import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Search } from "lucide-react";
import { useLeads, useAllLeads, useLeadUsage } from "@/hooks/use-leads";
import { useAuthMe } from "@/hooks/use-auth";
import { LeadCard } from "@/components/LeadCard";
import { Input } from "@/components/ui";
import { getPlanLimit } from "@/lib/planLimits";

export default function Dashboard() {
  const { data: user } = useAuthMe();
  const { data: matchedResponse, isLoading: leadsLoading } = useLeads();
  const { data: allResponse, isLoading: allLoading } = useAllLeads();
  const { data: usageData } = useLeadUsage();

  const [search, setSearch] = useState("");
  const [showAll] = useState(true);

  // ✅ ADMIN
  const isAdmin =
    user?.role === "admin" ||
    user?.email === "logicguild733@gmail.com";

  // ✅ PLAN
  const plan = (user as any)?.subscription_plan || "basic";
  const limit = getPlanLimit(plan);
  const unlockLimit = limit === 100 ? null : limit;

  const usage =
    usageData || (showAll ? allResponse?.usage : matchedResponse?.usage);

  const activeLeads = showAll
    ? allResponse?.leads || []
    : matchedResponse?.leads || [];

  const isLoading = showAll ? allLoading : leadsLoading;

  // ✅ SEARCH
  const filteredLeads = useMemo(() => {
    if (!activeLeads) return [];

    return activeLeads.filter((lead: any) => {
      const text = `${lead.client_name} ${lead.description} ${lead.service_needed}`.toLowerCase();
      return text.includes(search.toLowerCase());
    });
  }, [activeLeads, search]);

  // ✅ SUBSCRIPTION CHECK
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

      {/* 🔥 EARNING PSYCHOLOGY */}
      <div className="bg-green-50 border border-green-200 p-4 rounded-2xl space-y-2">
        <p className="text-sm font-semibold text-green-700">
          🚀 Start small, grow fast
        </p>

        <p className="text-sm text-green-600">
          Many users get their first client within 10–15 leads.
        </p>

        {unlockLimit !== null && (
          <p className="text-sm text-green-700">
            You’ve unlocked <b>{usage?.used || 0}</b> / <b>{unlockLimit}</b> leads.
          </p>
        )}
      </div>

      {/* 🔥 SOFT UPGRADE */}
      {unlockLimit !== null && (
        <div className="bg-blue-50 border border-blue-200 p-4 rounded-2xl">
          <p className="text-sm text-blue-700 font-medium">
            If 15 leads can get you a client…
          </p>

          <p className="text-sm text-blue-600">
            Imagine what 30 or 100 leads can do for your income 💰
          </p>

          <button
            onClick={() =>
              (window.location.href = "mailto:logicguild733@gmail.com")
            }
            className="mt-3 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm"
          >
            Upgrade Plan
          </button>
        </div>
      )}

      {/* SEARCH */}
      <div className="relative">
        <Search
          className="absolute left-3 top-2.5 text-muted-foreground"
          size={16}
        />
        <Input
          className="pl-9"
          placeholder="Search leads..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* PLAN INFO */}
      <div className="text-sm text-muted-foreground">
        Plan: <b>{plan}</b> | Limit:{" "}
        <b>{unlockLimit === null ? "Unlimited" : unlockLimit}</b>
      </div>

      {/* LEADS */}
      {isLoading ? (
        <p>Loading leads...</p>
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

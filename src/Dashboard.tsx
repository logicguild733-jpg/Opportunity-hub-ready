import { useState, useMemo, useCallback } from "react";
import { motion } from "framer-motion";
import { Search, SlidersHorizontal, Sparkles, X, ChevronDown, Bell, Zap } from "lucide-react";
import { useLeads, useAllLeads, useLeadUsage } from "@/hooks/use-leads";
import { useSkills } from "@/hooks/use-skills";
import { useAuthMe } from "@/hooks/use-auth";
import { LeadCard } from "@/components/LeadCard";
import { Input } from "@/components/ui";
import { toast } from "sonner";

const QUALITY_OPTIONS = ["HOT", "GOOD", "MEDIUM"];

const getAuthHeaders = (): Record<string, string> => {
  const token = localStorage.getItem("opportunity_token");
  return token ? { Authorization: `Bearer ${token}` } : {};
};

export default function Dashboard() {
  const { data: user } = useAuthMe();
  const { data: matchedResponse, isLoading: leadsLoading, refetch: refetchMatched } = useLeads();
  const { data: allResponse, isLoading: allLoading, refetch: refetchAll } = useAllLeads();
  const { data: usageData } = useLeadUsage();

  const [search, setSearch] = useState("");
  const [showAll, setShowAll] = useState(true);
  const [showFilters, setShowFilters] = useState(false);
  const [filterIndustry, setFilterIndustry] = useState("");
  const [filterCountry, setFilterCountry] = useState("");
  const [filterCity, setFilterCity] = useState("");
  const [filterQuality, setFilterQuality] = useState<string[]>([]);

  // =========================
  // 🔥 STABLE ROLE LOGIC FIX
  // =========================
  const isAdmin =
    user?.role === "admin" ||
    user?.email === "logicguild733@gmail.com";

  const plan = (user as any)?.subscription_plan || "basic";

  const usage = usageData || (showAll ? allResponse?.usage : matchedResponse?.usage);

  const unlockLimit =
    (usage as any)?.unlock_limit ??
    (plan === "gold" ? null : plan === "premium" ? 30 : 15);

  const activeLeads = showAll
    ? (allResponse?.leads || [])
    : (matchedResponse?.leads || []);

  const isLoading = showAll ? allLoading : leadsLoading;

  const filteredLeads = useMemo(() => {
    if (!activeLeads) return [];

    return activeLeads.filter((lead: any) => {
      const searchWords = search.toLowerCase().trim().split(/\s+/).filter(Boolean);

      const allFields = [
        lead.client_name,
        lead.service_needed,
        lead.description || "",
        lead.industry || "",
        lead.lead_text || "",
        lead.country || "",
        lead.city || ""
      ].join(" ").toLowerCase();

      const matchesSearch =
        searchWords.length === 0 ||
        searchWords.some(w => allFields.includes(w));

      const matchesIndustry =
        !filterIndustry ||
        filterIndustry === "All Industries" ||
        lead.industry?.toLowerCase() === filterIndustry.toLowerCase();

      const matchesCountry =
        !filterCountry ||
        filterCountry === "All Countries" ||
        lead.country?.toLowerCase() === filterCountry.toLowerCase();

      const matchesCity =
        !filterCity ||
        lead.city?.toLowerCase().includes(filterCity.toLowerCase());

      const matchesQuality =
        filterQuality.length === 0 ||
        filterQuality.includes(lead.lead_quality);

      return (
        matchesSearch &&
        matchesIndustry &&
        matchesCountry &&
        matchesCity &&
        matchesQuality
      );
    });
  }, [activeLeads, search, filterIndustry, filterCountry, filterCity, filterQuality]);

  const isInactive = user?.subscription_status === "inactive";

  if (isInactive) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-center">
        <h2 className="text-2xl font-bold">Subscription Inactive</h2>
        <p className="text-muted-foreground mt-2">
          Please contact support to renew your subscription.
        </p>
        <a
          href="mailto:logicguild733@gmail.com"
          className="mt-6 text-primary underline"
        >
          Contact Support
        </a>
      </div>
    );
  }

  return (
    <div className="space-y-6">

      {/* Header */}
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

      {/* Search */}
      <div className="flex gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-2.5 text-muted-foreground" size={16} />
          <Input
            className="pl-9"
            placeholder="Search leads..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <button
          onClick={() => setShowFilters(!showFilters)}
          className="border px-4 rounded-xl"
        >
          Filters
        </button>
      </div>

      {/* Loading */}
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

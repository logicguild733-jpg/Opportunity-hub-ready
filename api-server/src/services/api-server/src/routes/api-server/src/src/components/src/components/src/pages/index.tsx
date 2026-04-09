import React, { useEffect, useState } from "react";
import AppLayout from "../components/AppLayout";
import LeadCard from "../components/LeadCard";
import { supabase } from "../lib/supabase";

type Lead = {
  client_name: string;
  description: string;
  service_needed: string;
  contact_email?: string;
  contact_phone?: string;
  skill?: string;
  created_at: string;
};

const HomePage: React.FC = () => {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLeads = async () => {
      try {
        const tenDaysAgo = new Date();
        tenDaysAgo.setDate(tenDaysAgo.getDate() - 10);

        const { data, error } = await supabase
          .from("demand_leads")
          .select("*")
          .gte("created_at", tenDaysAgo.toISOString())
          .order("created_at", { ascending: false })
          .limit(20);

        if (error) {
          console.error("Supabase error:", error);
        } else {
          setLeads(data || []);
        }
      } catch (err) {
        console.error("Failed to fetch leads", err);
      } finally {
        setLoading(false);
      }
    };

    fetchLeads();
  }, []);

  return (
    <AppLayout>
      <h1 className="text-2xl font-bold mb-4">Leads Dashboard</h1>

      {loading ? (
        <p>Loading leads...</p>
      ) : leads.length === 0 ? (
        <p>No leads available</p>
      ) : (
        leads.map((lead, idx) => (
          <LeadCard
            key={idx}
            lead={{
              client_name: lead.client_name,
              service_needed: lead.service_needed,
              description: lead.description,
              contact_email: lead.contact_email,
              contact_phone: lead.contact_phone,
            }}
          />
        ))
      )}
    </AppLayout>
  );
};

export default HomePage;

import { supabase } from "../lib/supabase";

export async function fetchRSSLeads() {
  try {
    const rssUrl = "https://example.com/rss.xml";

    const response = await fetch(rssUrl);
    const text = await response.text();

    console.log("RSS fetched:", text.length);

    const leads = [
      {
        title: "Urgent: Need Arabic Teacher",
        description: "Looking for online Arabic teacher for kids",
        link: "https://example.com/arabic",
        tags: "Arabic"
      },
      {
        title: "Hiring Business Coach",
        description: "Startup needs part-time business coach",
        link: "https://example.com/coach",
        tags: "Business Coaching"
      }
    ];

    const insertData = leads.map((lead) => ({
      client_name: lead.title,
      service_needed: lead.tags,
      description: lead.description,
      contact_email: null,
      contact_phone: null,
      skill: lead.tags,
      country: "Global",
      created_at: new Date().toISOString()
    }));

    const { error } = await supabase
      .from("demand_leads")
      .insert(insertData);

    if (error) {
      console.error("RSS insert error:", error);
    }

    return leads;
  } catch (err) {
    console.error("RSS fetch error:", err);
    return [];
  }
}

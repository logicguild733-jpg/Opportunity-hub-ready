import { supabase } from "../lib/supabase";

export async function fetchGoogleLeads() {
try {
const leads = [
{
client_name: "Need English Teacher",
service_needed: "English",
description: "Looking for an online English teacher.",
skill: "English",
country: "Global",
created_at: new Date().toISOString()
},
{
client_name: "Need Arabic Teacher",
service_needed: "Arabic",
description: "Looking for an online Arabic teacher.",
skill: "Arabic",
country: "Global",
created_at: new Date().toISOString()
}
];

const { error } = await supabase
  .from("demand_leads")
  .insert(leads);

if (error) {
  console.error("Google leads insert error:", error);
  return 0;
}

console.log(`Inserted ${leads.length} Google leads`);
return leads.length;

} catch (err) {
console.error("Google leads failed:", err);
return 0;
}
}

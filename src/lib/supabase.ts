import { createClient } from "@supabase/supabase-js";

// Your Supabase project URL
const supabaseUrl = "https://qnkxrxxwfikhrlirfleg.supabase.co";

// Your Supabase publishable/anon key
const supabaseKey = "sb_publishable_exYuiUhOVuWEyPqROu4p5A_gCWtb89S";

// Initialize Supabase client
export const supabase = createClient(supabaseUrl, supabaseKey);

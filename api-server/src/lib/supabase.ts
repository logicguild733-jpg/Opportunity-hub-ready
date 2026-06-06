import { createClient } from "@supabase/supabase-js";

const supabaseUrl =
"https://qnkxrxxwfikhrlirfleg.supabase.co";

const supabaseKey =
"YOUR_EXISTING_ANON_KEY_HERE";

export const supabase = createClient(
supabaseUrl,
supabaseKey
);

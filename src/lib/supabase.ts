import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://qnkxrxxwfikhrlirfleg.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFua3hyeHh3ZmlraHJsaXJmbGVnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzE5MTc4NDcsImV4cCI6MjA4NzQ5Mzg0N30.FX-ZcM-w6ci01NpYP9aAwgTzIx-I7Ir00YUm_fcmd7I";

export const supabase = createClient(supabaseUrl, supabaseKey);

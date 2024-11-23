import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://mmipdngjutcjhntbxlqu.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1taXBkbmdqdXRjamhudGJ4bHF1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzA5OTc1NzYsImV4cCI6MjA0NjU3MzU3Nn0.NvnAONxWJ61LFiby4gHymGAvy8wcPI89BWVD73d9-vE";
const supabase = createClient(supabaseUrl, supabaseKey);
export default supabase;

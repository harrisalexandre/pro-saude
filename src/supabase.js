import { createClient } from "@supabase/supabase-js";

export const supabase=createClient(
  "https://vohmmqexaopbmtgycgdt.supabase.co",
  "sb_publishable_Nz3auPK8gFoeojQ0F34BXA_Dehd4Zqj",
  {auth:{persistSession:true,autoRefreshToken:true,detectSessionInUrl:true}}
);
import { createClient, type PostgrestResponse } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string;
const supabaseKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY as string;
const supabaseServiceRoleKey = import.meta.env
  .VITE_SUPABASE_SERVICE_ROLE_KEY as string;
export const supabase = createClient(supabaseUrl, supabaseKey);
export const supabaseAdm = createClient(supabaseUrl, supabaseServiceRoleKey);

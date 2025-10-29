import { createClient } from "@supabase/supabase-js";
// Cria os clientes que farão as requisições ao DB, um com uma chave genérica e outro com chave de adm, presentes no .env.local
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string;
const supabaseKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY as string;
const supabaseServiceRoleKey = import.meta.env
  .VITE_SUPABASE_SERVICE_ROLE_KEY as string;
export const supabase = createClient(supabaseUrl, supabaseKey);
export const supabaseAdm = createClient(supabaseUrl, supabaseServiceRoleKey);

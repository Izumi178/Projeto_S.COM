import { createClient, type PostgrestResponse } from "@supabase/supabase-js";
import { type login } from "./createAccount";

export async function AuthLogin({ email, senha }: login) {
  const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string;
  const supabaseKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY as string;
  const supabase = createClient(supabaseUrl, supabaseKey);
  const password = senha;
  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  if (error) {
    return false;
  } else {
    console.log("yeee");
    return true;
  }
}

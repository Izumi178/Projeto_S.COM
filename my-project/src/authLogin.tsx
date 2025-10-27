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
    return true;
  }
}

export async function verifyAuth() {
  const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string;
  const supabaseKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY as string;
  const supabase = createClient(supabaseUrl, supabaseKey);
  const {
    data: { session },
    error,
  } = await supabase.auth.getSession();
  if (error) {
    return null;
  } else {
    if (session?.user.email) {
      return session.user.email;
    } else {
      return null;
    }
  }
}

export async function logOut() {
  const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string;
  const supabaseKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY as string;
  const supabase = createClient(supabaseUrl, supabaseKey);
  const { error } = await supabase.auth.signOut();
  if (error) {
    return false;
  } else {
    return true;
  }
}

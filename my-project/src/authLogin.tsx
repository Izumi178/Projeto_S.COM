import { createClient, type PostgrestResponse } from "@supabase/supabase-js";
import { type login } from "./createAccount";
import { supabase } from "./supabaseCliente";

export async function AuthLogin({ email, senha }: login) {
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
  const { error } = await supabase.auth.signOut();
  if (error) {
    return false;
  } else {
    return true;
  }
}

export async function verifyAdm() {
  const {
    data: { session },
    error,
  } = await supabase.auth.getSession();
  if (error) {
    return null;
  } else {
    if (session?.user.id) {
      const { data, error } = await supabase
        .from("pessoas")
        .select("tipo")
        .match({ id: session.user.id });
      if (error) {
        return null;
      } else {
        if (data[0] && data[0].tipo === "admin") {
          return true;
        } else {
          return false;
        }
      }
    } else {
      return null;
    }
  }
}

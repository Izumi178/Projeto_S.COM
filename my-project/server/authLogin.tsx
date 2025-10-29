import { type login } from "./createAccount";
import { supabase } from "./supabaseCliente";

// Função de Login
export async function AuthLogin({ email, senha }: login) {
  const password = senha;
  // Tenta logar com os campos de email e senha
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

// Verifica se o usuário está autenticado
export async function verifyAuth() {
  // Pega a sessão do usuário
  const {
    data: { session },
    error,
  } = await supabase.auth.getSession();
  if (error) {
    return null;
  } else {
    // Retorna o id do usuário caso a sessão seja verdadeira
    if (session?.user.id) {
      return session.user.id;
    } else {
      return null;
    }
  }
}
//Função de logout
export async function logOut() {
  const { error } = await supabase.auth.signOut();
  if (error) {
    return false;
  } else {
    return true;
  }
}

// Função que verifica se o usuário é um administrador
export async function verifyAdm() {
  // Pega a sessão do usuário
  const {
    data: { session },
    error,
  } = await supabase.auth.getSession();
  if (error) {
    return null;
  } else {
    // Verifica se o usuário está configurado como administrador
    if (session?.user.id) {
      const { data, error } = await supabase
        .from("pessoas")
        .select("tipo")
        .match({ id: session.user.id });
      if (error) {
        return null;
      } else {
        // Se o tipo do usuário corresponder a admin, retorna verdaeiro
        if (data[0] && data[0].tipo === "admin") {
          return true;
        } else {
          // Senão falso
          return false;
        }
      }
    } else {
      return null;
    }
  }
}

import { useNavigate } from "react-router-dom";
import { supabase } from "./supabaseCliente";

export async function sendEmail(email: string) {
  const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: "https://localhost:5173/updatePassword",
  });
  if (error) {
    return false;
  } else {
    return true;
  }
}

import { createClient, type PostgrestResponse } from "@supabase/supabase-js";
import { type Pessoas } from "./getRegisterData";

export async function getUsers() {
  const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string;
  const supabaseKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY as string;
  const supabase = createClient(supabaseUrl, supabaseKey);
  const { data, error }: PostgrestResponse<Pessoas> = await supabase
    .from("pessoas")
    .select("id, name");
  if (error) {
    console.log(error);
  } else {
    console.log(data);
    return data;
  }
}

export async function deleteUser(user: Pessoas) {
  const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string;
  const supabaseKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY as string;
  const supabase = createClient(supabaseUrl, supabaseKey);
  const id = user.id;
  const { error } = await supabase.from("pessoas").delete().match({ id: id });
  if (error) {
    return false;
  } else {
    const { error } = await supabase
      .from("endereco")
      .delete()
      .match({ pessoa_id: id });
    if (error) {
      return false;
    } else {
      const { error } = await supabase
        .from("alunos")
        .delete()
        .match({ pessoa_id: id });
      if (error) {
        return false;
      } else {
        const { error } = await supabase.auth.admin.deleteUser(id);
        if (error) {
          return false;
        } else {
          return true;
        }
      }
    }
  }
}

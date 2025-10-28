import { type PostgrestResponse } from "@supabase/supabase-js";
import { type Pessoas } from "./getRegisterData";
import { supabaseAdm } from "./supabaseCliente";

export async function getUsers() {
  const { data, error }: PostgrestResponse<Pessoas> = await supabaseAdm
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
  const id = user.id;
  const { error } = await supabaseAdm
    .from("pessoas")
    .delete()
    .match({ id: id });
  if (error) {
    return false;
  } else {
    const { error } = await supabaseAdm
      .from("endereco")
      .delete()
      .match({ pessoa_id: id });
    if (error) {
      return false;
    } else {
      const { error } = await supabaseAdm
        .from("alunos")
        .delete()
        .match({ pessoa_id: id });
      if (error) {
        return false;
      } else {
        const { error } = await supabaseAdm.auth.admin.deleteUser(id);
        if (error) {
          return false;
        } else {
          return true;
        }
      }
    }
  }
}

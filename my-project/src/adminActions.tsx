import { type PostgrestResponse } from "@supabase/supabase-js";
import { type Pessoas } from "./getRegisterData";
import { supabase, supabaseAdm } from "./supabaseCliente";
import type { address, person } from "./createAccount";
import type { Aluno } from "./getInstitutionalData";

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

export async function getUserEmail(id: string) {
  const { data, error } = await supabaseAdm
    .from("alunos")
    .select("email")
    .match({ pessoa_id: id });
  if (error) {
    console.log(error);
  } else {
    return data[0].email;
  }
}

type userData = {
  pers: Pessoas;
  ad: address;
  log: Aluno;
};

export async function editUser({ pers, ad, log }: userData) {
  const { error } = await supabaseAdm
    .from("pessoas")
    .update({
      name: pers.name,
      email: pers.email,
      CPF: pers.CPF,
      telefone: pers.telefone,
      sexo: pers.sexo,
      nascimento: pers.nascimento,
      civil: pers.civil,
      cidade: pers.cidade,
    })
    .match({ id: pers.id });
  if (error) {
    console.log(error);
    return false;
  } else {
    const { error } = await supabaseAdm
      .from("endereco")
      .update({
        CEP: ad.CEP,
        cidade: ad.Cidade,
        logradouro: ad.Logradouro,
        numero: ad.Numero,
      })
      .match({ pessoa_id: pers.id });
    if (error) {
      console.log(error);
      return false;
    } else {
      const { error } = await supabaseAdm
        .from("alunos")
        .update({ email: log.email })
        .match({ pessoa_id: pers.id });
      if (error) {
        console.log(error);
        return false;
      } else {
        return true;
      }
    }
  }
}

import { type PostgrestResponse } from "@supabase/supabase-js";
import { type Pessoas } from "./getRegisterData";
import { supabase, supabaseAdm } from "./supabaseCliente";
import type { address, login, person } from "./createAccount";
import type { Aluno } from "./getInstitutionalData";

// Retorna a lista de usuários da página de admin
export async function getUsers() {
  // Seleciona todas as linhas da tabela 'pessoas' e atribui a data o tipo Pessoas
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

// Deleta os dados do usuário do DB
export async function deleteUser(user: Pessoas) {
  const id = user.id;
  // Apaga a linha de que contém o id do usuário da tabela enderecos
  const { error } = await supabaseAdm
    .from("endereco")
    .delete()
    .match({ pessoa_id: id });

  if (error) {
    console.log(error);
    return false;
  } else {
    // Apaga a linha de que contém o id do usuário da tabela alunos
    const { error } = await supabaseAdm
      .from("alunos")
      .delete()
      .match({ pessoa_id: id });
    if (error) {
      return false;
    } else {
      // Apaga a linha de que contém o id do usuário da tabela pessoas
      const { error } = await supabaseAdm
        .from("pessoas")
        .delete()
        .match({ id: id });
      if (error) {
        return false;
      } else {
        // Apaga a linha de que contém o id do usuário da tabela de usuarios
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

// Dados do usuário à ser atualizado
type userData = {
  pers: Pessoas;
  ad: address;
  log: Aluno;
  password: string;
};

export async function editUser({ pers, ad, log, password }: userData) {
  // Atualiza os dados pessoais do usuário
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
    // Atualiza os dados do endereço do usuário
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
      // Atualiza os dados institucionais do usuário
      const { error } = await supabaseAdm
        .from("alunos")
        .update({ email: log.email })
        .match({ pessoa_id: pers.id });
      if (error) {
        console.log(error);
        return false;
      } else {
        // Atualiza email e senha do usuário, caso a senah tenha sido preenchida
        if (password != "") {
          const { error } = await supabaseAdm.auth.admin.updateUserById(
            pers.id,
            {
              email: log.email,
              password: password,
            }
          );
          if (error) {
            return false;
          } else {
            return true;
          }
          // Senão, atualiza email apenas o email
        } else {
          const { error } = await supabaseAdm.auth.admin.updateUserById(
            pers.id,
            {
              email: log.email,
            }
          );
          if (error) {
            return false;
          } else {
            return true;
          }
        }
      }
    }
  }
}

// Dados enviados à função de criação de usuário
type newUser = {
  pers: person;
  ad: address;
  log: login;
  std: Aluno;
};

export async function createAccount({ pers, ad, log }: newUser) {
  // Cria o usuário
  const { data, error } = await supabaseAdm.auth.admin.createUser({
    email: log.email,
    password: log.senha,
  });
  if (error) {
    return false;
  } else {
    // Cria uma linha com o id do usuário com os dados pessoais do usuário
    const id = data.user.id;
    const { error } = await supabaseAdm.from("pessoas").insert({
      id: id,
      name: pers.Nome,
      email: pers.Email,
      CPF: pers.CPF,
      telefone: pers.Telefone,
      sexo: pers.Sexo,
      nascimento: pers.Nascimento,
      civil: pers.Civil,
      cidade: pers.Cidade,
    });
    if (error) {
      console.log(error);
      return false;
    } else {
      // Cria uma linha com o id do usuário com os dados de endereço do usuário
      const { error } = await supabaseAdm.from("endereco").insert({
        id: Math.floor(Math.random() * (100000 - 0 + 1)),
        pessoa_id: id,
        CEP: ad.CEP,
        cidade: ad.Cidade,
        logradouro: ad.Logradouro,
        numero: ad.Numero,
      });
      if (error) {
        console.log(error);
        return false;
      } else {
        // Cria uma linha com o id do usuário com os dados institucionais do usuário
        const { error } = await supabaseAdm.from("alunos").insert({
          pessoa_id: id,
          RA: Math.floor(Math.random() * (100000 - 0 + 1)),
          email: log.email,
        });
        if (error) {
          console.log(error);
          return false;
        } else {
          return true;
        }
      }
    }
  }
}

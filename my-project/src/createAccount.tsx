import { createClient, type PostgrestResponse } from "@supabase/supabase-js";
import { supabase } from "./supabaseCliente";

export type person = {
  Nome: string;
  Email: string;
  CPF: string;
  Nascimento: string;
  Cidade: string;
  Telefone: string;
  Civil: string;
  Sexo: string;
};

export type address = {
  CEP: string;
  Logradouro: string;
  Cidade: string;
  Numero: string;
};

export type login = {
  email: string;
  senha: string;
};

type allData = {
  pers: person;
  ad: address;
  log: login;
  id?: string;
};

export async function CreateAccount({ pers, ad, log }: allData) {
  const { data, error } = await supabase.auth.signUp({
    email: log.email,
    password: log.senha,
  });
  if (error) {
    return false;
  } else {
    if (data.user != null) {
      const id = data.user.id;
      if (await setData({ pers, ad, log, id })) {
        return true;
      } else {
        return false;
      }
    }
  }
}

async function setData({ pers, ad, log, id }: allData) {
  const CPF = pers.CPF;
  const { error } = await supabase.from("pessoas").insert({
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
    return false;
  } else {
    const { error } = await supabase.from("endereco").insert({
      id: Math.floor(Math.random() * (100000 - 0 + 1)),
      CEP: ad.CEP,
      cidade: ad.Cidade,
      logradouro: ad.Logradouro,
      numero: ad.Numero,
      pessoa_id: id,
    });
    if (error) {
      return false;
    } else {
      const { data } = await supabase
        .from("aprovados")
        .select("curso")
        .match({ CPF: CPF });
      console.log(data);
      if (data) {
        const curso = data[0].curso;
        console.log(curso);
        const { error } = await supabase.from("alunos").insert({
          RA: Math.floor(Math.random() * (100000 - 0 + 1)),
          pessoa_id: id,
          curso: curso,
          email: log.email,
        });
        if (error) {
          console.log(error);
        } else {
          return true;
        }
      } else {
        return false;
      }
    }
  }
}

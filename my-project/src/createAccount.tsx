import { createClient, type PostgrestResponse } from "@supabase/supabase-js";

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
};

export async function CreateAccount({ pers, ad, log }: allData) {
  const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string;
  const supabaseKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY as string;
  const supabase = createClient(supabaseUrl, supabaseKey);
  const { error } = await supabase.auth.signUp({
    email: pers.Email,
    password: log.senha,
  });
  if (error) {
    return false;
  } else {
    await setData({ pers, ad, log });
    return true;
  }
}

async function setData({ pers, ad, log }: allData) {
  const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string;
  const supabaseKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY as string;
  const supabase = createClient(supabaseUrl, supabaseKey);
  const id = Math.floor(Math.random() * (100 - 0 + 1));
  const CPF = pers.CPF;
  const { error } = await supabase.from("pessoas").insert({
    id: id,
    name: pers.Nome,
    email: pers.Email,
    CPF: pers.CPF,
    telefone: pers.Telefone,
    sexo: pers.Sexo,
    nascimento: pers.Nascimento,
    civil: pers.Nascimento,
    cidade: pers.Cidade,
  });
  if (error) {
    return false;
  } else {
    const { error } = await supabase.from("endereco").insert({
      id: Math.floor(Math.random() * (100 - 0 + 1)),
      pessoa_id: id,
      CEP: ad.CEP,
      cidade: ad.Cidade,
      logradouro: ad.Logradouro,
      numero: ad.Numero,
    });
    if (error) {
      return false;
    } else {
      const { data } = await supabase
        .from("aprovados")
        .select("curso")
        .match({ CPF: CPF });
      if (data) {
        const curso = data[0];
        const { error } = await supabase.from("endereco").update({
          RA: Math.floor(Math.random() * (100 - 0 + 1)),
          pessoa_id: id,
          email: log.email,
          curso: curso,
        });
        return true;
      } else {
        return false;
      }
    }
  }
}

import { createClient, type PostgrestResponse } from "@supabase/supabase-js";
import { GetInstitutionalData } from "./getInstitutionalData";
import { supabase } from "./supabaseCliente";

export type Pessoas = {
  id: string;
  name: string;
  email: string;
  CPF: string;
  telefone: number;
  sexo: string;
  nascimento: string;
  civil: string;
  cidade: string;
};

export type Endereco = {
  id: number;
  pessoa_id: string;
  CEP: string;
  cidade: string;
  logradouro: number;
  numero: number;
};

export async function GetPersonalData(id: string) {
  const { data, error }: PostgrestResponse<Pessoas> = await supabase
    .from("pessoas")
    .select("*")
    .match({ id: id });
  if (error) {
    console.log(error);
  } else {
    return data;
  }
}

export async function GetAdressData(id: string) {
  const { data, error }: PostgrestResponse<Endereco> = await supabase
    .from("endereco")
    .select("*")
    .match({ pessoa_id: id });
  if (error) {
  } else {
    return data;
  }
}

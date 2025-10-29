import type { PostgrestResponse } from "@supabase/supabase-js";
import { supabase } from "./supabaseCliente";

// Dados pessoais
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

// Dados de endereço
export type Endereco = {
  id: number;
  pessoa_id: string;
  CEP: string;
  cidade: string;
  logradouro: number;
  numero: number;
};

// Seleciona os dados pessoais do usuário
export async function GetPersonalData(id: string) {
  // Seleciona a linha que contém o id do usuário
  const { data, error }: PostgrestResponse<Pessoas> = await supabase
    .from("pessoas")
    .select("*")
    .match({ id: id });
  if (error) {
    console.log(error);
  } else {
    // retorna os dados no formato do tipo pessoas
    return data;
  }
}

// Seleciona os dados pessoais do usuário
export async function GetAdressData(id: string) {
  // Seleciona a linha que contém o id do usuário
  const { data, error }: PostgrestResponse<Endereco> = await supabase
    .from("endereco")
    .select("*")
    .match({ pessoa_id: id });
  if (error) {
  } else {
    // retorna os dados no formato do tipo pessoas
    return data;
  }
}

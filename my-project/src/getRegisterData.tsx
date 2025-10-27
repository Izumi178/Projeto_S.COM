import { createClient, type PostgrestResponse } from "@supabase/supabase-js";
import { GetInstitutionalData } from "./getInstitutionalData";

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

export async function GetPersonalData(email: string) {
  const instData = await GetInstitutionalData(email);
  if (instData) {
    const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string;
    const supabaseKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY as string;
    const supabase = createClient(supabaseUrl, supabaseKey);
    const { data, error }: PostgrestResponse<Pessoas> = await supabase
      .from("pessoas")
      .select("*")
      .match({ id: instData[0].pessoa_id });
    if (error) {
      console.log(error);
    } else {
      return data;
    }
  }
}

export async function GetAdressData(email: string) {
  const personData = await GetPersonalData(email);
  if (personData) {
    const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string;
    const supabaseKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY as string;
    const supabase = createClient(supabaseUrl, supabaseKey);
    let id = personData[0].id;
    const { data, error }: PostgrestResponse<Endereco> = await supabase
      .from("endereco")
      .select("*")
      .match({ pessoa_id: id });
    if (error) {
    } else {
      return data;
    }
  }
}

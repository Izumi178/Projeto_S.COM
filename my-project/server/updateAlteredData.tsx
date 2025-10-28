import { createClient, type PostgrestResponse } from "@supabase/supabase-js";
import {
  GetAdressData,
  GetPersonalData,
  type Pessoas,
  type Endereco,
} from "./getRegisterData";
import { supabase } from "./supabaseCliente";

export type AlteredData = {
  id: string;
  email: string;
  telefone: number;
  logradouro: string;
  numero: number;
  cidade: string;
  cep: string;
};

export async function UpdateAlteredData(alteredData: AlteredData) {
  const { error } = await supabase
    .from("pessoas")
    .update({ email: alteredData.email, telefone: alteredData.telefone })
    .eq("id", alteredData.id);
  if (error) {
    return false;
  } else {
    const { error } = await supabase
      .from("endereco")
      .update({
        CEP: alteredData.cep,
        cidade: alteredData.cidade,
        logradouro: alteredData.logradouro,
        numero: alteredData.numero,
      })
      .eq("id", alteredData.id);
    if (error) {
      return false;
    } else {
      return true;
    }
  }
}

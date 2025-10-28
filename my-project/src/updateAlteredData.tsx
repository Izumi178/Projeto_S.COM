import { createClient, type PostgrestResponse } from "@supabase/supabase-js";
import {
  GetAdressData,
  GetPersonalData,
  type Pessoas,
  type Endereco,
} from "./getRegisterData";
import { supabase } from "./supabaseCliente";

export type AlteredData = {
  email_logged: string;
  email: string;
  telefone: number;
  logradouro: string;
  numero: number;
  cidade: string;
  cep: number;
};

export async function UpdateAlteredData(alteredData: AlteredData) {
  const persData = await GetPersonalData(alteredData.email_logged);
  const adData = await GetAdressData(alteredData.email_logged);
  if (persData) {
    const { error } = await supabase
      .from("pessoas")
      .update({ email: alteredData.email, telefone: alteredData.telefone })
      .eq("id", persData[0].id);
    if (error) {
      return false;
    } else if (adData) {
      const { error } = await supabase
        .from("endereco")
        .update({
          CEP: alteredData.cep,
          cidade: alteredData.cidade,
          logradouro: alteredData.logradouro,
          numero: alteredData.numero,
        })
        .eq("id", adData[0].id);
      if (error) {
        return false;
      } else {
        return true;
      }
    }
  }
}

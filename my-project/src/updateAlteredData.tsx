import { createClient, type PostgrestResponse } from "@supabase/supabase-js";
import {
  GetAdressData,
  GetPersonalData,
  type Pessoas,
  type Endereco,
} from "./getRegisterData";

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
  const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string;
  const supabaseKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY as string;
  const supabase = createClient(supabaseUrl, supabaseKey);
  const persData = await GetPersonalData(alteredData.email_logged);
  const adData = await GetAdressData(alteredData.email_logged);
  if (persData) {
    const { error } = await supabase
      .from("pessoas")
      .update({ email: alteredData.email, telefone: alteredData.telefone })
      .eq("id", persData[0].id);
    if (error) {
      console.log(error);
    }
  }
  if (adData) {
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
      console.log(error);
    }
  }
}

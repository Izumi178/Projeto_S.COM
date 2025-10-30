import { supabase } from "./supabaseCliente";

// Dados alterados pelo usuário
export type AlteredData = {
  id: string;
  email: string;
  telefone: number;
  logradouro: string;
  numero: number;
  cidade: string;
  cep: string;
};

// Função que  altera os dados pessoais e de endereço do usuário
export async function UpdateAlteredData(alteredData: AlteredData) {
  // Atualiza os dados de contato do usuário
  const { error } = await supabase
    .from("pessoas")
    .update({ email: alteredData.email, telefone: alteredData.telefone })
    .eq("id", alteredData.id);
  if (error) {
    return false;
  } else {
    // Atualiza os dados de endereço do usuário
    const { error } = await supabase
      .from("endereco")
      .update({
        CEP: alteredData.cep,
        cidade: alteredData.cidade,
        logradouro: alteredData.logradouro,
        numero: alteredData.numero,
      })
      .eq("pessoa_id", alteredData.id);
    if (error) {
      return false;
    } else {
      return true;
    }
  }
}

import { type PostgrestResponse } from "@supabase/supabase-js";
import { supabase } from "./supabaseCliente";

export type Aluno = {
  RA: number;
  pessoa_id: string;
  email: string;
  curso: string;
  semestre: number;
  horas_curso: number;
  horas_extensao: number;
  horas_complementar: number;
  horas_estagio: number;
};

export async function GetInstitutionalData(id: string) {
  const { data, error }: PostgrestResponse<Aluno> = await supabase
    .from("alunos")
    .select("*")
    .match({ pessoa_id: id });
  if (error) {
    console.log(error);
  } else {
    return data;
  }
}

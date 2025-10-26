import { createClient, type PostgrestResponse } from "@supabase/supabase-js";

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

export async function GetInstitutionalData(email: string) {
  const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string;
  const supabaseKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY as string;
  const supabase = createClient(supabaseUrl, supabaseKey);
  const { data, error }: PostgrestResponse<Aluno> = await supabase
    .from("alunos")
    .select("*")
    .match({ email: email });
  if (error) {
    console.log(error);
  } else {
    return data;
  }
}

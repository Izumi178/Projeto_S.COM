import { supabaseAdm } from "./supabaseCliente";

type interval = {
  max: number;
  min: number;
};

// Calcula o cr da turma
export async function GetCRData({ max, min }: interval) {
  // Calcula seleciona o cr dos alunos do mesmo semestre
  const { data, error } = await supabaseAdm
    .from("alunos")
    .select("cr")
    .gte("semestre", min)
    .lte("semestre", max);
  if (error) {
    console.log(error);
  } else {
    // Calcula e retorna media
    const crList = data.map((item) => item.cr);

    return crList;
  }
}

import { supabaseAdm } from "./supabaseCliente";

type interval = {
  max: number;
  min: number;
};

// Seleciona o cr de alunos dentro de um intervalo de semestres
export async function GetCRData({ max, min }: interval) {
  // Calcula seleciona o cr dos alunos entre um intervalo de semestres
  const { data, error } = await supabaseAdm
    .from("alunos")
    .select("cr")
    .gte("semestre", min)
    .lte("semestre", max);
  if (error) {
    console.log(error);
  } else {
    // Mapeia o conteúdo dos dados em
    const crList = data.map((item) => item.cr);

    return crList;
  }
}

import { type PostgrestResponse } from "@supabase/supabase-js";
import { supabase } from "./supabaseCliente";
import { useState } from "react";

// Dados do Aluno
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
  materias: number;
  reprovadas: number;
  cr: number;
};

// Seleciona os dados institucionais do aluno
export async function GetInstitutionalData(id: string) {
  // Seleciona a linha que contém o id de usuário do aluno
  const { data, error }: PostgrestResponse<Aluno> = await supabase
    .from("alunos")
    .select("*")
    .match({ pessoa_id: id });
  if (error) {
    console.log(error);
  } else {
    // retorna os dados no formato do tipo Aluno
    return data;
  }
}

// Calcula o cr da turma
export async function GetTurmaCR(semestre: number) {
  // Variavel de media
  const [avg, calcAvg] = useState(0);
  // Calcula seleciona o cr dos alunos do mesmo semestre
  const { data, error } = await supabase
    .from("alunos")
    .select("cr")
    .match({ semestre: semestre });
  if (error) {
    console.log(error);
  } else {
    // Calcula e retorna media
    for (let i = 0; i < data.length; i++) {
      calcAvg(avg + data[0].cr);
    }
    return avg / data.length;
  }
}

// Importa o cliente anonimo do supabase
import { supabase } from "./supabaseCliente";

// Dados pessoais
export type person = {
  Nome: string;
  Email: string;
  CPF: string;
  Nascimento: string;
  Cidade: string;
  Telefone: string;
  Civil: string;
  Sexo: string;
};

// Dados de endereço
export type address = {
  CEP: string;
  Logradouro: string;
  Cidade: string;
  Numero: number;
};

// Dados de login
export type login = {
  email: string;
  senha: string;
};

// Dados do registro
type allData = {
  pers: person;
  ad: address;
  log: login;
  id?: string;
};

// Função de criação de conta
export async function CreateAccount({ pers, ad, log }: allData) {
  // Cria um usário autenticavel
  const { data, error } = await supabase.auth.signUp({
    email: log.email,
    password: log.senha,
  });
  if (error) {
    return false;
  } else {
    // Caso não haja erros, usa os dados recebidos e o id de usuário para inserir os dados pessoais, de endereço e institucionais
    if (data.user != null) {
      const id = data.user.id;
      if (await setData({ pers, ad, log, id })) {
        return true;
      } else {
        return false;
      }
    }
  }
}

// Função que insere os dados pessoais, de endereço e institucionais nas tabelas
async function setData({ pers, ad, log, id }: allData) {
  // Usa CPF para verificar o curso do aprovado
  const CPF = pers.CPF;
  // Insere os dados pessoais na tabela pessoas
  const { error } = await supabase.from("pessoas").insert({
    id: id,
    name: pers.Nome,
    email: pers.Email,
    CPF: pers.CPF,
    telefone: pers.Telefone,
    sexo: pers.Sexo,
    nascimento: pers.Nascimento,
    civil: pers.Civil,
    cidade: pers.Cidade,
  });
  if (error) {
    return false;
  } else {
    // Insere os dados de endereço na tabela de endereço
    const { error } = await supabase.from("endereco").insert({
      id: Math.floor(Math.random() * (100000 - 0 + 1)),
      CEP: ad.CEP,
      cidade: ad.Cidade,
      logradouro: ad.Logradouro,
      numero: ad.Numero,
      pessoa_id: id,
    });
    if (error) {
      return false;
    } else {
      // Verifica o curso do usuário
      const { data } = await supabase
        .from("aprovados")
        .select("curso")
        .match({ CPF: CPF });
      console.log(data);
      if (data) {
        // Insere os dados institucionais do aluno
        const curso = data[0].curso;
        console.log(curso);
        const { error } = await supabase.from("alunos").insert({
          RA: Math.floor(Math.random() * (100000 - 0 + 1)),
          pessoa_id: id,
          curso: curso,
          email: log.email,
        });
        if (error) {
          console.log(error);
        } else {
          return true;
        }
      } else {
        return false;
      }
    }
  }
}
//Função que verifica se o CPF do aluno está na lista de usuários
export async function checkCPF(CPF: string) {
  // Verifica se o CPF existe na tabela
  const { data } = await supabase
    .from("aprovados")
    .select("*")
    .match({ CPF: CPF });
  // Se o tamanho de data for diferente de zero, significa que o CPF existe
  if (data && data.length != 0) {
    return true;
  } else {
    return false;
  }
}

import { GoogleGenAI } from "@google/genai";

//Cria objeto do tipo GoogleGenAI
const ai = new GoogleGenAI({
  apiKey: "AIzaSyBu-xTBMfSFLoxKURWLG_y629UOIgFvLUM",
});

//Mesnagem do usuário
type request = {
  message: string | undefined;
};

// Função utilizada no chatBot para analisar mensagens do usuário
export async function test({ message }: request) {
  //Mensagem a ser mandada para a IA
  const request = message + "\nResuma em 1 paragrafo";
  //Gera a reposta escolhendo um modelo da IA, o texto
  const response = await ai.models.generateContent({
    model: "gemini-2.0-flash",
    contents: [{ role: "user", parts: [{ text: request }] }],
    config: {
      responseMimeType: "text/plain",
    },
  });
  //retorna a resposta da IA
  if (response) {
    return response.text;
  } else {
    return "Erro ao processar o pedido";
  }
}
// Medidas de centralidade, dispersão, assimetria e curtose
export type medidas = {
  media: number;
  mediana: number;
  moda: number;
  desvio_padrao: number;
  variancia: number;
  coef_variacao: number;
  assimetria: number;
  curtose: number;
};
// Intervalo de semestre
type interval = {
  min: number;
  max: number;
};

type analysis = {
  interval: interval | undefined;
  medidas: medidas | undefined;
};

// Função de analise de desempenho dos alunos
export async function analise({ interval, medidas }: analysis) {
  // Mensagem a ser enviada para a IA
  const request =
    "Faça uma analise do desempenho de alunos, resumida em um paragrafo, utilizando as seguintes medidas de notas de alunos entre os semestres " +
    interval?.min +
    " e " +
    interval?.max;
  ":\nMédia: " +
    medidas?.media +
    "\nMediana: " +
    medidas?.mediana +
    "\nModa: " +
    medidas?.moda +
    "\nDevio padrão: " +
    medidas?.desvio_padrao +
    "\nVariância: " +
    medidas?.variancia +
    "\nCoeficiente de variação: " +
    medidas?.coef_variacao +
    "\nAssimetria: " +
    medidas?.assimetria +
    "\nCurtose: " +
    medidas?.curtose;
  // Resposta gerada pela IA ao pedido
  const response = await ai.models.generateContent({
    model: "gemini-2.0-flash",
    contents: [{ role: "user", parts: [{ text: request }] }],
    config: {
      responseMimeType: "text/plain",
    },
  });
  // Se a resposta for definida, retorna o texto da resposta
  if (response) {
    return response.text;
  } else {
    // Senão retorna outro texto
    return "Erro ao processar o pedido";
  }
}

// Função utilizada para analisar sentimentos dos alunos
export async function feel({ message }: request) {
  //Mensagem a ser mandada para a IA
  const request =
    message +
    "\nFaça uma analise dos sentimentos desses alunos a partir desse texto de desempenho, resuma em 1 paragrafo";
  //Gera a reposta escolhendo um modelo da IA, o texto
  const response = await ai.models.generateContent({
    model: "gemini-2.0-flash",
    contents: [{ role: "user", parts: [{ text: request }] }],
    config: {
      responseMimeType: "text/plain",
    },
  });
  //retorna a resposta da IA
  if (response) {
    return response.text;
  } else {
    return "Erro ao processar o pedido";
  }
}

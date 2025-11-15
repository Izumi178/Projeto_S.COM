import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: "AIzaSyBu-xTBMfSFLoxKURWLG_y629UOIgFvLUM",
});

type request = {
  message: string;
};

export async function test({ message }: request) {
  const request = message + "\nResuma em 1 paragrafo";
  const response = await ai.models.generateContent({
    model: "gemini-2.0-flash",
    contents: [{ role: "user", parts: [{ text: request }] }],
    config: {
      responseMimeType: "text/plain",
    },
  });
  if (response) {
    return response.text;
  } else {
    return "Erro ao processar o pedido";
  }
}

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

type interval = {
  min: number;
  max: number;
};

type analysis = {
  interval: interval | undefined;
  medidas: medidas | undefined;
};

export async function analise({ interval, medidas }: analysis) {
  const request =
    "Faça uma analise resumida em um paragrafo utilizando as seguintes medidas de notas de alunos entre os semestres " +
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
  const response = await ai.models.generateContent({
    model: "gemini-2.0-flash",
    contents: [{ role: "user", parts: [{ text: request }] }],
    config: {
      responseMimeType: "text/plain",
    },
  });
  if (response) {
    return response.text;
  } else {
    return "Erro ao processar o pedido";
  }
}

import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: "AIzaSyBu-xTBMfSFLoxKURWLG_y629UOIgFvLUM",
});

type request = {
  message: string;
};

export async function test({ message }: request) {
  const response = await ai.models.generateContent({
    model: "gemini-2.0-flash",
    contents: [{ role: "user", parts: [{ text: message }] }],
  });
  if (response) {
    return response.text;
  } else {
    return "Erro ao processar o pedido";
  }
}

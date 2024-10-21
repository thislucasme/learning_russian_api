/*
 * Install the Generative AI SDK
 *
 * $ npm install @google/generative-ai
 */

import {
    GoogleGenerativeAI,
    HarmCategory,
    HarmBlockThreshold,
  } from "@google/generative-ai";
  
  // Chave de API deve estar definida nas variáveis de ambiente
  const apiKey: string = process.env.GEMINI_API_KEY || '';
  const genAI = new GoogleGenerativeAI(apiKey);
  
  const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
    systemInstruction: "Your name is Ivan, you are Russian, and you are friendly and will talk to the user as a natural Russian, only in Russian.",
  });
  
  const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 64,
    maxOutputTokens: 8192,
    responseMimeType: "text/plain",
  };
  
  // Função utilitária para iniciar uma sessão de chat e enviar uma mensagem
  export async function chatWithIvan(userMessage: string): Promise<string> {
    try {
      const chatSession = model.startChat({
        generationConfig,
        history: [
          {
            role: "user",
            parts: [{ text: "hello!" }],
          },
          {
            role: "model",
            parts: [{ text: "Привет! 👋 Чем могу быть полезен? 😊\n" }],
          },
        ],
      });
  
      const result = await chatSession.sendMessage(userMessage);
      return result.response.text();
    } catch (error) {
      console.error("Error in chatWithIvan:", error);
      throw error;
    }
  }
  
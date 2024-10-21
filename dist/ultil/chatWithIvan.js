"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.chatWithIvan = void 0;
const generative_ai_1 = require("@google/generative-ai");
const apiKey = process.env.GEMINI_API_KEY || '';
const genAI = new generative_ai_1.GoogleGenerativeAI(apiKey);
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
async function chatWithIvan(userMessage) {
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
    }
    catch (error) {
        console.error("Error in chatWithIvan:", error);
        throw error;
    }
}
exports.chatWithIvan = chatWithIvan;
//# sourceMappingURL=chatWithIvan.js.map
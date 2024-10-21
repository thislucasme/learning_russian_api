"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessageService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const message_schema_1 = require("./entities/message.schema");
const mongoose_2 = require("mongoose");
const generative_ai_1 = require("@google/generative-ai");
const apiKey = 'AIzaSyBTkiRUV-euSl55F3QA5T909dGXhFmRnvU';
const genAI = new generative_ai_1.GoogleGenerativeAI(apiKey);
const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 64,
    maxOutputTokens: 8192,
    responseMimeType: "text/plain",
};
let MessageService = class MessageService {
    constructor(conversationModel) {
        this.conversationModel = conversationModel;
    }
    async create(messageTdo, user) {
        const createMessage = new this.conversationModel(messageTdo);
        return createMessage.save();
    }
    async getMessages(conversationId) {
        const messages = await this.conversationModel.find({ conversationId: conversationId }).exec();
        return messages;
    }
    async chatWithIvan(userMessage) {
        const model = genAI.getGenerativeModel({
            model: "gemini-1.5-flash",
            systemInstruction: "Your name is Ivan, you are Russian, and you are friendly and will talk to the user as a natural Russian, only in Russian.",
        });
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
    async checkGrammar(userMessage) {
        const model = genAI.getGenerativeModel({
            model: "gemini-1.5-flash",
            systemInstruction: `You will correct the user's sentence to Russian. Only respond in Russian and give a small explanation in English when the user makes a mistake. Always return the response as JSON:
      {
        "text_corrected": "corrected text here",
        "explanation": "explanation here"
      }`,
        });
        try {
            const chatSession = model.startChat({
                generationConfig,
                history: [
                    {
                        role: "user",
                        parts: [
                            { text: "Я пошел в магазин купить яблоко, но они была закрыт." },
                        ],
                    },
                    {
                        role: "model",
                        parts: [
                            {
                                text: `{
                  "text_corrected": "Я пошел в магазин купить яблоко, но он был закрыт.",
                  "explanation": "The word 'они' (they) should be replaced with 'он' (he/it) since you are talking about the store, which is singular."
                }`,
                            },
                        ],
                    },
                ],
            });
            const result = await chatSession.sendMessage(userMessage);
            return JSON.parse(result.response.text());
        }
        catch (error) {
            console.error("Error in checkGrammar:", error);
            throw error;
        }
    }
};
MessageService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(message_schema_1.Message.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], MessageService);
exports.MessageService = MessageService;
//# sourceMappingURL=message.service.js.map


import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Message, MessageDocument } from './entities/message.schema';
import { Model } from 'mongoose';
import { CreateMessageTdo } from './tdo/createmessageTdo';
import { UserTdoResponse } from 'src/auth/tdo/userTdoResponse';
import { Bot, BotDocument } from 'src/bot/entities/bot.schema';
import { CreateConversationTdo } from 'src/conversation/tdo/createConversationTdo';

import {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} from "@google/generative-ai";

// Chave de API deve estar definida nas variáveis de ambiente
const apiKey: string = 'AIzaSyBTkiRUV-euSl55F3QA5T909dGXhFmRnvU';
const genAI = new GoogleGenerativeAI(apiKey);



const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 64,
  maxOutputTokens: 8192,
  responseMimeType: "text/plain",
};


@Injectable()
export class MessageService {
  constructor(@InjectModel(Message.name) private conversationModel: Model<MessageDocument>,) {

  }
  async create(messageTdo: CreateMessageTdo, user: UserTdoResponse): Promise<Message> {
    const createMessage = new this.conversationModel(messageTdo);
    return createMessage.save();
  }
  async getMessages(conversationId: string): Promise<MessageDocument[]> {
    const messages: MessageDocument[] = await this.conversationModel.find({conversationId: conversationId}).exec()
    return messages;
  }

   async chatWithIvan(userMessage: string): Promise<string> {
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
    } catch (error) {
      console.error("Error in chatWithIvan:", error);
      throw error;
    }
  }
  async checkGrammar(userMessage: string): Promise<string> {
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
    } catch (error) {
      console.error("Error in checkGrammar:", error);
      throw error;
    }
  }
  
  
}

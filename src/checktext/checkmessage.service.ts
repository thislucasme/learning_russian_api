import { Injectable } from '@nestjs/common';
import Groq from "groq-sdk";
import { CorrectionTdo } from './tdo/correction';
import { GenerateResponseTdo } from './tdo/generateResponseTdo';
import { ResponseTdo } from './tdo/response';

const groq = new Groq({ apiKey: "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" });

@Injectable()
export class CheckMessageService {
    async generateResponse(generateResponseTdo: GenerateResponseTdo):Promise<ResponseTdo> {
        const response : ResponseTdo = new ResponseTdo();
        response.text = "Привет! 👋 Чем могу быть полезен? 😊"
        return response
    }
    async getCorrectionByUserText(text: string): Promise<CorrectionTdo> {
        const corretion = new CorrectionTdo()
        corretion.text_corrected = "Я пошел в магазин купить яблоко, но он был закрыт."
        corretion.explanation = "The word 'они' (they) should be replaced with 'он' (he/it) since you are talking about the store, which is singular."
        return corretion
    }
}

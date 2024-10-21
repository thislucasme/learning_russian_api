"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CheckMessageService = void 0;
const common_1 = require("@nestjs/common");
const groq_sdk_1 = require("groq-sdk");
const correction_1 = require("./tdo/correction");
const response_1 = require("./tdo/response");
const groq = new groq_sdk_1.default({ apiKey: "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" });
let CheckMessageService = class CheckMessageService {
    async generateResponse(generateResponseTdo) {
        const response = new response_1.ResponseTdo();
        response.text = "Привет! 👋 Чем могу быть полезен? 😊";
        return response;
    }
    async getCorrectionByUserText(text) {
        const corretion = new correction_1.CorrectionTdo();
        corretion.text_corrected = "Я пошел в магазин купить яблоко, но он был закрыт.";
        corretion.explanation = "The word 'они' (they) should be replaced with 'он' (he/it) since you are talking about the store, which is singular.";
        return corretion;
    }
};
CheckMessageService = __decorate([
    (0, common_1.Injectable)()
], CheckMessageService);
exports.CheckMessageService = CheckMessageService;
//# sourceMappingURL=checkmessage.service.js.map
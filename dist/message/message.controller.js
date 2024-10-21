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
exports.MessageController = void 0;
const common_1 = require("@nestjs/common");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const createmessageTdo_1 = require("./tdo/createmessageTdo");
const currentUser_1 = require("../auth/utils/currentUser");
const userTdoResponse_1 = require("../auth/tdo/userTdoResponse");
const message_service_1 = require("./message.service");
const flashcard_service_1 = require("../flashcards/flashcard.service");
const checkmessage_service_1 = require("../checktext/checkmessage.service");
const generateResponseTdo_1 = require("../checktext/tdo/generateResponseTdo");
const bot_service_1 = require("../bot/bot.service");
let MessageController = class MessageController {
    constructor(messageService, flashcardService, checkMessageService, botService) {
        this.messageService = messageService;
        this.flashcardService = flashcardService;
        this.checkMessageService = checkMessageService;
        this.botService = botService;
    }
    async create(createMessageTdo, user) {
        const userInput = createMessageTdo.message;
        let response;
        try {
            response = await this.messageService.chatWithIvan(userInput);
        }
        catch (error) {
            console.error("Erro ao conversar com Ivan:", error);
        }
        let checkResponse;
        try {
            checkResponse = await this.messageService.checkGrammar(userInput);
            console.log("Check Grammar:", checkResponse.explanation);
        }
        catch (error) {
            console.error("Erro ao conversar com Ivan:", error);
        }
        const flashcardTdo = {
            front: checkResponse.text_corrected,
            back: "A tradução aqui.",
            conversationId: createMessageTdo.conversationId,
            from: createMessageTdo.from,
            userId: user.userId
        };
        const generateBotResponseTod = new generateResponseTdo_1.GenerateResponseTdo();
        generateBotResponseTod.message = createMessageTdo.message;
        const idBot = await this.botService.getBotIdByUser(user.userId);
        const botMessageResponseTdo = {
            message: response,
            conversationId: createMessageTdo.conversationId,
            from: idBot,
        };
        const botMessageResponseCorrectionTdo = {
            message: `Corrected text: "${checkResponse.text_corrected}". ${checkResponse.explanation}`,
            conversationId: createMessageTdo.conversationId,
            from: idBot,
        };
        const flashcardBotResponseTdo = {
            front: botMessageResponseTdo.message,
            back: "Привет, как дела?. (tradução resposta do bot",
            conversationId: createMessageTdo.conversationId,
            from: botMessageResponseTdo.from,
            userId: user.userId
        };
        const flashcardBotResponse = await this.flashcardService.create(flashcardBotResponseTdo);
        const flashcard = await this.flashcardService.create(flashcardTdo);
        const message = await this.messageService.create(createMessageTdo, user);
        const messageBotCorrection = await this.messageService.create(botMessageResponseCorrectionTdo, user);
        const messageBot = await this.messageService.create(botMessageResponseTdo, user);
        return { flashcard, message, flashcardBotResponse, messageBot };
    }
    async getMessages(query) {
        const { conversationId } = query;
        const messages = await this.messageService.getMessages(conversationId);
        return messages;
    }
    async getCorre(body) {
        return await this.messageService.checkGrammar(body.message);
    }
};
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, currentUser_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [createmessageTdo_1.CreateMessageTdo, userTdoResponse_1.UserTdoResponse]),
    __metadata("design:returntype", Promise)
], MessageController.prototype, "create", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], MessageController.prototype, "getMessages", null);
__decorate([
    (0, common_1.Post)("teste"),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], MessageController.prototype, "getCorre", null);
MessageController = __decorate([
    (0, common_1.Controller)("message"),
    __metadata("design:paramtypes", [message_service_1.MessageService,
        flashcard_service_1.FlashcardService,
        checkmessage_service_1.CheckMessageService,
        bot_service_1.BotService])
], MessageController);
exports.MessageController = MessageController;
//# sourceMappingURL=message.controller.js.map
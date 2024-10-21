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
exports.ConversationService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const conversation_schema_1 = require("./entities/conversation.schema");
const mongoose_2 = require("mongoose");
const bot_service_1 = require("../bot/bot.service");
const createBotTdo_1 = require("../bot/tdo/createBotTdo");
let ConversationService = class ConversationService {
    constructor(conversationModel, botService) {
        this.conversationModel = conversationModel;
        this.botService = botService;
    }
    async create(userDto, user) {
        userDto.userId = user.userId;
        const createdConversation = new this.conversationModel(userDto);
        const createBotTod = new createBotTdo_1.CreateBotTdo();
        createBotTod.userId = userDto.userId;
        const doc = await this.conversationModel.findOne({ userId: user.userId }).exec();
        if (doc) {
            return doc;
        }
        await this.botService.create(createBotTod);
        const createdConversationResponse = await createdConversation.save();
        return createdConversationResponse;
    }
};
ConversationService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(conversation_schema_1.Conversation.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        bot_service_1.BotService])
], ConversationService);
exports.ConversationService = ConversationService;
//# sourceMappingURL=conversation.service.js.map
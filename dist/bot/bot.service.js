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
exports.BotService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const bot_schema_1 = require("./entities/bot.schema");
const mongoose_2 = require("mongoose");
let BotService = class BotService {
    constructor(botModel) {
        this.botModel = botModel;
    }
    async create(botTdo) {
        const createBotTdo = new this.botModel(botTdo);
        return await createBotTdo.save();
    }
    async getBotIdByUser(userId) {
        const doc = await this.botModel.findOne({ userId: userId }).exec();
        return doc.id;
    }
};
BotService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(bot_schema_1.Bot.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], BotService);
exports.BotService = BotService;
//# sourceMappingURL=bot.service.js.map
"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessageModule = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const message_controller_1 = require("./message.controller");
const message_service_1 = require("./message.service");
const common_1 = require("@nestjs/common");
const message_schema_1 = require("./entities/message.schema");
const flashcard_schema_1 = require("../flashcards/entities/flashcard.schema");
const flashcard_service_1 = require("../flashcards/flashcard.service");
const checkmessage_service_1 = require("../checktext/checkmessage.service");
const bot_module_1 = require("../bot/bot.module");
let MessageModule = class MessageModule {
};
MessageModule = __decorate([
    (0, common_1.Module)({
        imports: [mongoose_1.MongooseModule.forFeature([{ name: message_schema_1.Message.name, schema: message_schema_1.MessageSchema }]),
            mongoose_1.MongooseModule.forFeature([{ name: flashcard_schema_1.Flashcard.name, schema: flashcard_schema_1.FlashcardSchema }]),
            bot_module_1.BotModule],
        controllers: [
            message_controller_1.MessageController,
        ],
        providers: [
            message_service_1.MessageService, flashcard_service_1.FlashcardService, checkmessage_service_1.CheckMessageService
        ],
    })
], MessageModule);
exports.MessageModule = MessageModule;
//# sourceMappingURL=message.module.js.map
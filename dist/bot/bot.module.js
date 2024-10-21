"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BotModule = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const bot_controller_1 = require("./bot.controller");
const bot_service_1 = require("./bot.service");
const common_1 = require("@nestjs/common");
const bot_schema_1 = require("./entities/bot.schema");
let BotModule = class BotModule {
};
BotModule = __decorate([
    (0, common_1.Module)({
        imports: [mongoose_1.MongooseModule.forFeature([{ name: bot_schema_1.Bot.name, schema: bot_schema_1.BotSchema }]),],
        controllers: [
            bot_controller_1.BotController
        ],
        providers: [
            bot_service_1.BotService
        ],
        exports: [bot_service_1.BotService]
    })
], BotModule);
exports.BotModule = BotModule;
//# sourceMappingURL=bot.module.js.map
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
exports.CheckMessageController = void 0;
const common_1 = require("@nestjs/common");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const createmessageTdo_1 = require("../message/tdo/createmessageTdo");
const checkmessage_service_1 = require("./checkmessage.service");
const generateResponseTdo_1 = require("./tdo/generateResponseTdo");
let CheckMessageController = class CheckMessageController {
    constructor(checkMessageService) {
        this.checkMessageService = checkMessageService;
    }
    async generateResponse(generateResponseTdo) {
        return this.checkMessageService.generateResponse(generateResponseTdo);
    }
    async checkUserMessage(createMessageTdo) {
        return this.checkMessageService.getCorrectionByUserText("texto do usuario");
    }
};
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Post)("bot-response"),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [generateResponseTdo_1.GenerateResponseTdo]),
    __metadata("design:returntype", Promise)
], CheckMessageController.prototype, "generateResponse", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Post)("check"),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [createmessageTdo_1.CreateMessageTdo]),
    __metadata("design:returntype", Promise)
], CheckMessageController.prototype, "checkUserMessage", null);
CheckMessageController = __decorate([
    (0, common_1.Controller)("generate"),
    __metadata("design:paramtypes", [checkmessage_service_1.CheckMessageService])
], CheckMessageController);
exports.CheckMessageController = CheckMessageController;
//# sourceMappingURL=checkmessage.controller.js.map
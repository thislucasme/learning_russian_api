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
exports.ConversationController = void 0;
const common_1 = require("@nestjs/common");
const conversation_service_1 = require("./conversation.service");
const createConversationTdo_1 = require("./tdo/createConversationTdo");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const currentUser_1 = require("../auth/utils/currentUser");
const userTdoResponse_1 = require("../auth/tdo/userTdoResponse");
let ConversationController = class ConversationController {
    constructor(conversationService) {
        this.conversationService = conversationService;
    }
    async create(createUserDto, user) {
        return this.conversationService.create(createUserDto, user);
    }
};
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, currentUser_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [createConversationTdo_1.CreateConversationTdo, userTdoResponse_1.UserTdoResponse]),
    __metadata("design:returntype", Promise)
], ConversationController.prototype, "create", null);
ConversationController = __decorate([
    (0, common_1.Controller)("conversation"),
    __metadata("design:paramtypes", [conversation_service_1.ConversationService])
], ConversationController);
exports.ConversationController = ConversationController;
//# sourceMappingURL=conversation.controller.js.map
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
exports.FlashcardController = void 0;
const common_1 = require("@nestjs/common");
const flashcard_service_1 = require("./flashcard.service");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const createflashcardTdo_1 = require("./tdo/createflashcardTdo");
const currentUser_1 = require("../auth/utils/currentUser");
const userTdoResponse_1 = require("../auth/tdo/userTdoResponse");
let FlashcardController = class FlashcardController {
    constructor(flashcardService) {
        this.flashcardService = flashcardService;
    }
    async create(createFlashcardTdo, user) {
        return this.flashcardService.create(createFlashcardTdo);
    }
    async getFlashcards(user) {
        return this.flashcardService.getFlashcards(user.userId);
    }
    async getCountNewAndToReviewCards(user) {
        return this.flashcardService.getCountNewAndToReviewCards(user.userId);
    }
    async updateCard(user, createFlashcardTdo, grade) {
        console.log(grade);
        console.log(createFlashcardTdo);
        return await this.flashcardService.update(createFlashcardTdo, grade);
    }
};
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, currentUser_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [createflashcardTdo_1.CreateFlashcardTdo, userTdoResponse_1.UserTdoResponse]),
    __metadata("design:returntype", Promise)
], FlashcardController.prototype, "create", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Get)(),
    __param(0, (0, currentUser_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [userTdoResponse_1.UserTdoResponse]),
    __metadata("design:returntype", Promise)
], FlashcardController.prototype, "getFlashcards", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Get)('count'),
    __param(0, (0, currentUser_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [userTdoResponse_1.UserTdoResponse]),
    __metadata("design:returntype", Promise)
], FlashcardController.prototype, "getCountNewAndToReviewCards", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Post)('update'),
    __param(0, (0, currentUser_1.CurrentUser)()),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Query)('grade')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [userTdoResponse_1.UserTdoResponse, Object, Number]),
    __metadata("design:returntype", Promise)
], FlashcardController.prototype, "updateCard", null);
FlashcardController = __decorate([
    (0, common_1.Controller)("flashcard"),
    __metadata("design:paramtypes", [flashcard_service_1.FlashcardService])
], FlashcardController);
exports.FlashcardController = FlashcardController;
//# sourceMappingURL=flashcard.controller.js.map
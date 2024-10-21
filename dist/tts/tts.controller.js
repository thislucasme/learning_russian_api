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
exports.TtsController = void 0;
const common_1 = require("@nestjs/common");
const tts_service_1 = require("./tts.service");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
let TtsController = class TtsController {
    constructor(ttsService) {
        this.ttsService = ttsService;
    }
    async createAudio(query, res) {
        const audioBuffer = await this.ttsService.getAudio(query);
        res.set({
            'Content-Type': 'audio/wav',
            'Content-Disposition': `attachment; filename="${query.idMessage}.wav"`,
        });
        res.send(audioBuffer);
    }
};
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], TtsController.prototype, "createAudio", null);
TtsController = __decorate([
    (0, common_1.Controller)("tts"),
    __metadata("design:paramtypes", [tts_service_1.TtsService])
], TtsController);
exports.TtsController = TtsController;
//# sourceMappingURL=tts.controller.js.map
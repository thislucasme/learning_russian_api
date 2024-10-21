"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FlashcardModule = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const flashcard_controller_1 = require("./flashcard.controller");
const flashcard_service_1 = require("./flashcard.service");
const common_1 = require("@nestjs/common");
const flashcard_schema_1 = require("./entities/flashcard.schema");
let FlashcardModule = class FlashcardModule {
};
FlashcardModule = __decorate([
    (0, common_1.Module)({
        imports: [mongoose_1.MongooseModule.forFeature([{ name: flashcard_schema_1.Flashcard.name, schema: flashcard_schema_1.FlashcardSchema }])],
        controllers: [
            flashcard_controller_1.FlashcardController,
        ],
        providers: [
            flashcard_service_1.FlashcardService,
        ],
    })
], FlashcardModule);
exports.FlashcardModule = FlashcardModule;
//# sourceMappingURL=flashcard.module.js.map
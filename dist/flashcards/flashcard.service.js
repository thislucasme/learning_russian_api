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
exports.FlashcardService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const flashcard_schema_1 = require("./entities/flashcard.schema");
const mongoose_2 = require("mongoose");
const supermemo_1 = require("supermemo");
const dayjs = require("dayjs");
let FlashcardService = class FlashcardService {
    constructor(flashcardModel) {
        this.flashcardModel = flashcardModel;
    }
    practice(flashcard, grade) {
        const { interval, repetition, efactor } = (0, supermemo_1.supermemo)(flashcard, grade);
        const dueDate = dayjs(Date.now()).add(interval, 'day').toISOString();
        return Object.assign(Object.assign({}, flashcard), { interval, repetition, efactor, dueDate });
    }
    async update(flashcardTdo, grade) {
        const currentDate = new Date(flashcardTdo.dueDate).toISOString();
        const dat = currentDate;
        const cardToReview = {
            back: flashcardTdo.back,
            front: flashcardTdo.front,
            dueDate: dat,
            interval: flashcardTdo.interval,
            repetition: flashcardTdo.repetition,
            efactor: flashcardTdo.efactor,
        };
        const gradeMemo = grade;
        const cardReviewd = this.practice(cardToReview, gradeMemo);
        const dueDate = new Date(cardReviewd.dueDate);
        flashcardTdo.dueDate = dueDate;
        flashcardTdo.interval = cardReviewd.interval;
        flashcardTdo.repetition = cardReviewd.repetition;
        const updatedFlashcard = await this.flashcardModel.findByIdAndUpdate(flashcardTdo.id, { $set: flashcardTdo }, { new: true }).exec();
        return updatedFlashcard;
    }
    async create(flashcardTdo) {
        const createMessage = new this.flashcardModel(flashcardTdo);
        return createMessage.save();
    }
    async getFlashcards(userId) {
        const startOfToday = new Date();
        startOfToday.setHours(0, 0, 0, 0);
        const endOfToday = new Date();
        endOfToday.setHours(23, 59, 59, 999);
        const flashcards = await this.flashcardModel.find({
            userId: userId, dueDate: {
                $gte: startOfToday,
                $lt: endOfToday
            }
        }).exec();
        return flashcards;
    }
    async getCountNewAndToReviewCards(userId) {
        const currentDate = new Date().toISOString().split('T')[0];
        console.clear();
        console.log(userId);
        const flashcards = await this.flashcardModel.find({ userId: userId }).exec();
        const newCards = flashcards.filter(card => {
            const createdAt = new Date(card.createdAt).toISOString().split('T')[0];
            const dueAt = new Date(card.dueDate).toISOString().split('T')[0];
            return createdAt === currentDate && dueAt == currentDate;
        }).length;
        const toReview = flashcards.filter(card => {
            const dueDate = new Date(card.dueDate).toISOString().split('T')[0];
            return dueDate <= currentDate && new Date(card.createdAt).toISOString().split('T')[0] !== currentDate;
        }).length;
        return { newCards, toReview };
    }
};
FlashcardService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(flashcard_schema_1.Flashcard.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], FlashcardService);
exports.FlashcardService = FlashcardService;
//# sourceMappingURL=flashcard.service.js.map
import { Flashcard, FlashcardDocument } from './entities/flashcard.schema';
import { Model } from 'mongoose';
import { CreateFlashcardTdo } from './tdo/createflashcardTdo';
import { SuperMemoGrade, SuperMemoItem } from 'supermemo';
interface FlashcardMemo extends SuperMemoItem {
    front: string;
    back: string;
    dueDate: string;
}
export declare class FlashcardService {
    private flashcardModel;
    constructor(flashcardModel: Model<FlashcardDocument>);
    practice(flashcard: FlashcardMemo, grade: SuperMemoGrade): FlashcardMemo;
    update(flashcardTdo: FlashcardDocument, grade: number): Promise<Flashcard>;
    create(flashcardTdo: CreateFlashcardTdo): Promise<Flashcard>;
    getFlashcards(userId: string): Promise<Flashcard[]>;
    getCountNewAndToReviewCards(userId: string): Promise<{
        newCards: number;
        toReview: number;
    }>;
}
export {};

import { FlashcardService } from './flashcard.service';
import { CreateFlashcardTdo } from './tdo/createflashcardTdo';
import { UserTdoResponse } from 'src/auth/tdo/userTdoResponse';
import { FlashcardDocument } from './entities/flashcard.schema';
export declare class FlashcardController {
    private readonly flashcardService;
    constructor(flashcardService: FlashcardService);
    create(createFlashcardTdo: CreateFlashcardTdo, user: UserTdoResponse): Promise<import("./entities/flashcard.schema").Flashcard>;
    getFlashcards(user: UserTdoResponse): Promise<import("./entities/flashcard.schema").Flashcard[]>;
    getCountNewAndToReviewCards(user: UserTdoResponse): Promise<{
        newCards: number;
        toReview: number;
    }>;
    updateCard(user: UserTdoResponse, createFlashcardTdo: FlashcardDocument, grade: number): Promise<import("./entities/flashcard.schema").Flashcard>;
}

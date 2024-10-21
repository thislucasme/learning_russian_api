import { MongooseModule } from '@nestjs/mongoose';
import { FlashcardController } from './flashcard.controller';
import { FlashcardService } from './flashcard.service';

import { Module } from '@nestjs/common';
import { Flashcard, FlashcardSchema } from './entities/flashcard.schema';

@Module({
    imports: [MongooseModule.forFeature([{ name: Flashcard.name, schema: FlashcardSchema }])],
    controllers: [
        FlashcardController,],
    providers: [
        FlashcardService,],
})
export class FlashcardModule { }

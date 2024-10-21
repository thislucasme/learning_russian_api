import { MongooseModule } from '@nestjs/mongoose';
import { MessageController } from './message.controller';
import { MessageService } from './message.service';

import { Module } from '@nestjs/common';
import { Message, MessageSchema } from './entities/message.schema';
import { Flashcard, FlashcardSchema } from 'src/flashcards/entities/flashcard.schema';
import { FlashcardService } from 'src/flashcards/flashcard.service';
import { CheckMessageService } from 'src/checktext/checkmessage.service';
import { Bot, BotSchema } from 'src/bot/entities/bot.schema';
import { BotModule } from 'src/bot/bot.module';

@Module({
    imports: [MongooseModule.forFeature([{ name: Message.name, schema: MessageSchema }]),
    MongooseModule.forFeature([{ name: Flashcard.name, schema: FlashcardSchema }]),
    BotModule],
    controllers: [
        MessageController,],
    providers: [
        MessageService, FlashcardService, CheckMessageService],
})
export class MessageModule { }

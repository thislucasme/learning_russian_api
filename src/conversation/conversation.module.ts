import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConversationController } from './conversation.controller';
import { ConversationService } from './conversation.service';
import { Conversation, ConversationSchema } from './entities/conversation.schema';
import { BotService } from 'src/bot/bot.service';
import { BotModule } from 'src/bot/bot.module';

@Module({
    imports: [
        MongooseModule.forFeature([{ name: Conversation.name, schema: ConversationSchema }]),
        BotModule
    ],
    controllers: [ConversationController],
    providers: [ConversationService],
    exports: [ConversationService],
})
export class ConversationModule {}

import { CreateMessageTdo } from './tdo/createmessageTdo';
import { UserTdoResponse } from 'src/auth/tdo/userTdoResponse';
import { MessageService } from './message.service';
import { FlashcardService } from 'src/flashcards/flashcard.service';
import { Flashcard } from 'src/flashcards/entities/flashcard.schema';
import { CheckMessageService } from 'src/checktext/checkmessage.service';
import { BotService } from 'src/bot/bot.service';
export declare class MessageController {
    private readonly messageService;
    private readonly flashcardService;
    private readonly checkMessageService;
    private readonly botService;
    constructor(messageService: MessageService, flashcardService: FlashcardService, checkMessageService: CheckMessageService, botService: BotService);
    create(createMessageTdo: CreateMessageTdo, user: UserTdoResponse): Promise<{
        flashcard: Flashcard;
        message: import("./entities/message.schema").Message;
        flashcardBotResponse: Flashcard;
        messageBot: import("./entities/message.schema").Message;
    }>;
    getMessages(query: any): Promise<import("./entities/message.schema").MessageDocument[]>;
    getCorre(body: any): Promise<string>;
}

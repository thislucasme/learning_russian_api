import { Conversation, ConversationDocument } from './entities/conversation.schema';
import { Model } from 'mongoose';
import { CreateConversationTdo } from './tdo/createConversationTdo';
import { UserTdoResponse } from 'src/auth/tdo/userTdoResponse';
import { BotService } from 'src/bot/bot.service';
export declare class ConversationService {
    private conversationModel;
    private botService;
    constructor(conversationModel: Model<ConversationDocument>, botService: BotService);
    create(userDto: CreateConversationTdo, user: UserTdoResponse): Promise<Conversation>;
}

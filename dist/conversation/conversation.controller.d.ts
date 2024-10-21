import { ConversationService } from './conversation.service';
import { CreateConversationTdo } from './tdo/createConversationTdo';
import { UserTdoResponse } from 'src/auth/tdo/userTdoResponse';
export declare class ConversationController {
    private readonly conversationService;
    constructor(conversationService: ConversationService);
    create(createUserDto: CreateConversationTdo, user: UserTdoResponse): Promise<import("./entities/conversation.schema").Conversation>;
}

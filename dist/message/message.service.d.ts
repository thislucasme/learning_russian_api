import { Message, MessageDocument } from './entities/message.schema';
import { Model } from 'mongoose';
import { CreateMessageTdo } from './tdo/createmessageTdo';
import { UserTdoResponse } from 'src/auth/tdo/userTdoResponse';
export declare class MessageService {
    private conversationModel;
    constructor(conversationModel: Model<MessageDocument>);
    create(messageTdo: CreateMessageTdo, user: UserTdoResponse): Promise<Message>;
    getMessages(conversationId: string): Promise<MessageDocument[]>;
    chatWithIvan(userMessage: string): Promise<string>;
    checkGrammar(userMessage: string): Promise<string>;
}

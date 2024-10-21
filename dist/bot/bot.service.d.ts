import { Bot, BotDocument } from './entities/bot.schema';
import { Model } from 'mongoose';
import { CreateBotTdo } from './tdo/createBotTdo';
export declare class BotService {
    private botModel;
    constructor(botModel: Model<BotDocument>);
    create(botTdo: CreateBotTdo): Promise<Bot>;
    getBotIdByUser(userId: string): Promise<any>;
}

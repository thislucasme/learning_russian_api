import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Bot, BotDocument } from './entities/bot.schema';
import { Model } from 'mongoose';
import { CreateBotTdo } from './tdo/createBotTdo';

@Injectable()
export class BotService {
    constructor(@InjectModel(Bot.name) private botModel: Model<BotDocument>) {
        
    }
    async create(botTdo: CreateBotTdo): Promise<Bot> {
        const createBotTdo = new this.botModel(botTdo);
        return await createBotTdo.save();
    }
    async getBotIdByUser(userId: string){
        const doc: BotDocument = await this.botModel.findOne({userId: userId}).exec()
        return doc.id;
    }
}

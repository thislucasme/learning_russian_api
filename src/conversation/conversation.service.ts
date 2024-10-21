import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Conversation, ConversationDocument } from './entities/conversation.schema';
import { Model } from 'mongoose';
import { CreateConversationTdo } from './tdo/createConversationTdo';
import { UserTdoResponse } from 'src/auth/tdo/userTdoResponse';
import { BotService } from 'src/bot/bot.service';
import { CreateBotTdo } from 'src/bot/tdo/createBotTdo';

@Injectable()
export class ConversationService {
    constructor(@InjectModel(Conversation.name) private conversationModel: Model<ConversationDocument>,
  private botService: BotService) {
        
    }
    async create(userDto: CreateConversationTdo, user: UserTdoResponse): Promise<Conversation> {
        userDto.userId = user.userId
        const createdConversation = new this.conversationModel(userDto);

        const createBotTod = new CreateBotTdo();
        createBotTod.userId = userDto.userId;

        const doc: ConversationDocument = await this.conversationModel.findOne({userId: user.userId}).exec()
        if(doc){
          return doc;
        }
        await this.botService.create(createBotTod);
        const createdConversationResponse = await createdConversation.save()
        return createdConversationResponse
        //return new Conversation()
      }
}

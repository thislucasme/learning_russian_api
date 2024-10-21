import { MongooseModule } from '@nestjs/mongoose';
import { BotController } from './bot.controller';
import { BotService } from './bot.service';
import { Module } from '@nestjs/common';
import { Bot, BotSchema } from './entities/bot.schema';

@Module({
    imports: [MongooseModule.forFeature([{ name: Bot.name, schema: BotSchema }]),],
    controllers: [
        BotController],
    providers: [
        BotService],
        exports: [BotService]
})
export class BotModule { }

import { Controller, Post } from '@nestjs/common';
import { BotService } from './bot.service';

@Controller("bot")
export class BotController {
    constructor(private botService : BotService){

    }
    @Post()
    async create(){
        return {}
    }
}

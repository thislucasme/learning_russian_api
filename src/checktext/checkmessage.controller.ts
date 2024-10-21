import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { CreateMessageTdo } from 'src/message/tdo/createmessageTdo';
import { CheckMessageService } from './checkmessage.service';
import { GenerateResponseTdo } from './tdo/generateResponseTdo';

@Controller("generate")
export class CheckMessageController {
    constructor(private checkMessageService: CheckMessageService){}

    @UseGuards(JwtAuthGuard)
    @Post("bot-response")
    async generateResponse(@Body() generateResponseTdo: GenerateResponseTdo){
        return this.checkMessageService.generateResponse(generateResponseTdo)
    }

    @UseGuards(JwtAuthGuard)
    @Post("check")
    async checkUserMessage(@Body() createMessageTdo: CreateMessageTdo){
        return this.checkMessageService.getCorrectionByUserText("texto do usuario");
    }
}

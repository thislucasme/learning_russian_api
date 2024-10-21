import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { ConversationService } from './conversation.service';
import { CreateConversationTdo } from './tdo/createConversationTdo';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { CurrentUser } from 'src/auth/utils/currentUser';
import { UserTdoResponse } from 'src/auth/tdo/userTdoResponse';

@Controller("conversation")
export class ConversationController {
    constructor(private readonly conversationService: ConversationService) {}
    @UseGuards(JwtAuthGuard)
    @Post()
    async create(@Body() createUserDto: CreateConversationTdo, @CurrentUser() user: UserTdoResponse) {
      return this.conversationService.create(createUserDto, user);
    }
}

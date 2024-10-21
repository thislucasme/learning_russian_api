
import { Body, Controller, Get, Param, Post, Query, UseGuards } from '@nestjs/common';
import { FlashcardService } from './flashcard.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { CreateFlashcardTdo } from './tdo/createflashcardTdo';
import { CurrentUser } from 'src/auth/utils/currentUser';
import { UserTdoResponse } from 'src/auth/tdo/userTdoResponse';
import { CreateConversationTdo } from 'src/conversation/tdo/createConversationTdo';
import { FlashcardDocument } from './entities/flashcard.schema';

@Controller("flashcard")
export class FlashcardController {
    constructor(private readonly flashcardService: FlashcardService) {}
    @UseGuards(JwtAuthGuard)
    @Post()
    async create(@Body() createFlashcardTdo: CreateFlashcardTdo, @CurrentUser() user: UserTdoResponse) {
        return this.flashcardService.create(createFlashcardTdo);
    }
    @UseGuards(JwtAuthGuard)
    @Get()
    async getFlashcards(@CurrentUser() user: UserTdoResponse) {
        return this.flashcardService.getFlashcards(user.userId);
    }

    @UseGuards(JwtAuthGuard)
    @Get('count')
    async getCountNewAndToReviewCards(@CurrentUser() user: UserTdoResponse) {
        return this.flashcardService.getCountNewAndToReviewCards(user.userId);
    }

    @UseGuards(JwtAuthGuard)
    @Post('update')
    async updateCard(@CurrentUser() user: UserTdoResponse, @Body() createFlashcardTdo : FlashcardDocument,
    @Query('grade') grade: number) {
        console.log(grade)
        console.log(createFlashcardTdo)
        return await this.flashcardService.update(createFlashcardTdo, grade);
    }
}

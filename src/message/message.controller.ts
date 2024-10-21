import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { CreateMessageTdo } from './tdo/createmessageTdo';
import { CurrentUser } from 'src/auth/utils/currentUser';
import { UserTdoResponse } from 'src/auth/tdo/userTdoResponse';
import { MessageService } from './message.service';
import { FlashcardService } from 'src/flashcards/flashcard.service';
import { Flashcard } from 'src/flashcards/entities/flashcard.schema';
import { CreateFlashcardTdo } from 'src/flashcards/tdo/createflashcardTdo';
import { CheckMessageService } from 'src/checktext/checkmessage.service';
import { GenerateResponseTdo } from 'src/checktext/tdo/generateResponseTdo';
import { BotService } from 'src/bot/bot.service';
import { CreateConversationTdo } from 'src/conversation/tdo/createConversationTdo';

@Controller("message")
export class MessageController {
    constructor(private readonly messageService: MessageService,
        private readonly flashcardService: FlashcardService,
        private readonly checkMessageService : CheckMessageService,
        private readonly botService : BotService
    ) {}
    @UseGuards(JwtAuthGuard)
    @Post()
    async create(@Body() createMessageTdo: CreateMessageTdo, @CurrentUser() user: UserTdoResponse) {

        const userInput: string = createMessageTdo.message
        let response;
        try {
           response = await this.messageService.chatWithIvan(userInput);
          //console.log("Resposta de Ivan:", response);
        } catch (error) {
          console.error("Erro ao conversar com Ivan:", error);
        }

        let checkResponse;
        try {
            checkResponse = await this.messageService.checkGrammar(userInput);
          console.log("Check Grammar:", checkResponse.explanation);
        } catch (error) {
          console.error("Erro ao conversar com Ivan:", error);
        }

   

        const flashcardTdo : CreateFlashcardTdo = {
            front: checkResponse.text_corrected,
            back: "A tradução aqui.",
            conversationId: createMessageTdo.conversationId,
            from: createMessageTdo.from,
            userId: user.userId
        }
        const generateBotResponseTod = new GenerateResponseTdo();
        generateBotResponseTod.message = createMessageTdo.message;

        //const botResponse = await this.checkMessageService.generateResponse(generateBotResponseTod)
        const idBot = await this.botService.getBotIdByUser(user.userId)
        const botMessageResponseTdo: CreateMessageTdo = {
            message: response,
            conversationId: createMessageTdo.conversationId,
            from: idBot,
        }

        const botMessageResponseCorrectionTdo: CreateMessageTdo = {
            message: `Corrected text: "${checkResponse.text_corrected}". ${checkResponse.explanation}`,
            conversationId: createMessageTdo.conversationId,
            from: idBot,
        }

        const flashcardBotResponseTdo : CreateFlashcardTdo = {
            front: botMessageResponseTdo.message,
            back: "Привет, как дела?. (tradução resposta do bot",
            conversationId: createMessageTdo.conversationId,
            from: botMessageResponseTdo.from,
            userId: user.userId
        }
        const flashcardBotResponse = await this.flashcardService.create(flashcardBotResponseTdo)
        const flashcard = await this.flashcardService.create(flashcardTdo)
        const message = await this.messageService.create(createMessageTdo, user);
        const messageBotCorrection = await this.messageService.create(botMessageResponseCorrectionTdo, user);
        const messageBot = await this.messageService.create(botMessageResponseTdo, user);
        return {flashcard, message, flashcardBotResponse, messageBot}
    }
    @UseGuards(JwtAuthGuard)
    @Get()
    async getMessages(@Query() query: any) {
        const { conversationId } = query
        const messages = await this.messageService.getMessages(conversationId)
        return messages
    }
    @Post("teste")
    async getCorre(@Body() body: any){
        return await this.messageService.checkGrammar(body.message);
    }
}

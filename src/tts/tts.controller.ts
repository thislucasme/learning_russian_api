import { Controller, Get, Post, Query, Res, UseGuards } from '@nestjs/common';
import { TtsService } from './tts.service';
import { Response } from 'express';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@Controller("tts")
export class TtsController { 
    constructor(private ttsService:TtsService){

    }

    @UseGuards(JwtAuthGuard)
    @Get()
    async createAudio(@Query() query: any, @Res() res: Response){ 
        //return await this.ttsService.getTtsResponse(query)
        const audioBuffer =  await this.ttsService.getAudio(query)
        res.set({
            'Content-Type': 'audio/wav',
            'Content-Disposition': `attachment; filename="${query.idMessage}.wav"`,
          });
          res.send(audioBuffer);
    }
}

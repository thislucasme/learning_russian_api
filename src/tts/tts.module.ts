import { TtsController } from './tts.controller';
import { TtsService } from './tts.service';
import { Module } from '@nestjs/common';

@Module({
    imports: [],
    controllers: [
        TtsController,],
    providers: [
        TtsService,],
})
export class TtsModule { }

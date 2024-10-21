import { TtsService } from './tts.service';
import { Response } from 'express';
export declare class TtsController {
    private ttsService;
    constructor(ttsService: TtsService);
    createAudio(query: any, res: Response): Promise<void>;
}

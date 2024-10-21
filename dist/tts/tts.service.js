"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TtsService = void 0;
const common_1 = require("@nestjs/common");
const axios_1 = require("axios");
const fs_1 = require("fs");
const promises_1 = require("fs/promises");
const path_1 = require("path");
const AWS = require("aws-sdk");
const credentials = new AWS.Credentials('AKIAUQ4L3HHQNIHSD2FE', 'G+FdLKIjaTjFgM43W3OVOCa1dxzILE/xFO/Sb7V+');
AWS.config.update({
    region: 'us-east-1',
    credentials: credentials,
});
const polly = new AWS.Polly();
let TtsService = class TtsService {
    async getTtsResponse(query) {
        const { idMessage, text } = query;
        const url = 'http://localhost:5500/api/tts';
        const params = {
            voice: 'glow-speak:ru_nikolaev',
            lang: 'ru',
            vocoder: 'high',
            denoiserStrength: '0.02',
            text: text,
            speakerId: '',
            ssml: 'false',
            ssmlNumbers: 'true',
            ssmlDates: 'true',
            ssmlCurrency: 'true',
            cache: 'false',
        };
        const headers = {
            'Accept': '*/*',
            'Accept-Language': 'pt-BR,pt;q=0.9,en-US;q=0.8,en;q=0.7,ru;q=0.6',
            'Cache-Control': 'max-age=0',
            'Connection': 'keep-alive',
            'Referer': 'http://localhost:5500/',
            'Sec-Fetch-Dest': 'empty',
            'Sec-Fetch-Mode': 'cors',
            'Sec-Fetch-Site': 'same-origin',
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 YaBrowser/24.7.0.0 Safari/537.36',
            'sec-ch-ua': '"Not/A)Brand";v="8", "Chromium";v="126", "YaBrowser";v="24.7", "Yowser";v="2.5"',
            'sec-ch-ua-mobile': '?0',
            'sec-ch-ua-platform': '"Windows"',
        };
        try {
            const response = await axios_1.default.get(url, {
                params,
                headers,
                responseType: 'arraybuffer',
            });
            const audioBuffer = response.data;
            const filePath = (0, path_1.join)(__dirname, '..', 'audio', `${idMessage}.wav`);
            await (0, promises_1.writeFile)(filePath, audioBuffer);
            try {
                const filepath = (0, path_1.join)(__dirname, '..', 'audio', `${idMessage}.wav`);
                return (0, fs_1.readFileSync)(filepath);
            }
            catch (error) {
                throw new common_1.NotFoundException('Audio file not found');
            }
        }
        catch (error) {
            console.error('Error fetching TTS response:', error);
            throw error;
        }
    }
    checkIfFileExists(idMessage) {
        const filepath = (0, path_1.join)(__dirname, '..', 'audio', `${idMessage}.wav`);
        return (0, fs_1.existsSync)(filepath);
    }
    async getAudioAws(query) {
        const params = {
            Text: 'Ох, понимаю. Тяжелый день выдался? 😥  Расскажи, что тебя утомило? Может, я смогу чем-то помочь?',
            OutputFormat: 'mp3',
            VoiceId: 'Maxim',
        };
        polly.synthesizeSpeech(params, (err, data) => {
            if (err) {
                console.error('Erro ao sintetizar fala:', err);
            }
            else if (data.AudioStream instanceof Buffer) {
                const fs = require('fs');
                fs.writeFile('output.mp3', data.AudioStream, (err) => {
                    if (err) {
                        console.error('Erro ao salvar arquivo:', err);
                    }
                    else {
                        console.log('Arquivo de áudio salvo como output.mp3');
                    }
                });
            }
        });
    }
    async getAudio(query) {
        const { idMessage } = query;
        if (this.checkIfFileExists(idMessage)) {
            try {
                const filepath = (0, path_1.join)(__dirname, '..', 'audio', `${idMessage}.wav`);
                return (0, fs_1.readFileSync)(filepath);
            }
            catch (error) {
                throw new common_1.NotFoundException('Audio file not found');
            }
        }
        else {
            return await this.getTtsResponse(query);
        }
    }
};
TtsService = __decorate([
    (0, common_1.Injectable)()
], TtsService);
exports.TtsService = TtsService;
//# sourceMappingURL=tts.service.js.map
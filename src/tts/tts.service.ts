import { Injectable, NotFoundException } from '@nestjs/common';
import axios from 'axios';
import { existsSync, readFileSync } from 'fs';
import { writeFile } from 'fs/promises';
import { join } from 'path';
import { v4 as uuidv4 } from 'uuid';
import * as AWS from 'aws-sdk';
const credentials = new AWS.Credentials('AKIAUQ4L3HHQNIHSD2FE', 'G+FdLKIjaTjFgM43W3OVOCa1dxzILE/xFO/Sb7V+');
AWS.config.update({
    region: 'us-east-1', // Altere para sua região desejada
    credentials: credentials,
});

const polly = new AWS.Polly();
@Injectable()
export class TtsService {
    async getTtsResponse(query: any): Promise<any> {

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
            const response = await axios.get(url, {
                params,
                headers,
                responseType: 'arraybuffer', // Receber o áudio como buffer
            });

            const audioBuffer = response.data;
            //const audioId = uuidv4(); // Gera um ID único para o arquivo
            const filePath = join(__dirname, '..', 'audio', `${idMessage}.wav`);

            // Salva o buffer como um arquivo .wav
            await writeFile(filePath, audioBuffer);

            try {
                const filepath = join(__dirname, '..', 'audio', `${idMessage}.wav`);
                return readFileSync(filepath);
            } catch (error) {
                throw new NotFoundException('Audio file not found');
            }
        } catch (error) {
            console.error('Error fetching TTS response:', error);
            throw error;
        }
    }

    checkIfFileExists(idMessage: string) {
        const filepath = join(__dirname, '..', 'audio', `${idMessage}.wav`);
        return existsSync(filepath);
    }
    async getAudioAws(query: any){
        const params = {
            Text: 'Ох, понимаю. Тяжелый день выдался? 😥  Расскажи, что тебя утомило? Может, я смогу чем-то помочь?',
            OutputFormat: 'mp3', // Formato de saída
            VoiceId: 'Maxim', // ID da voz
        };

        polly.synthesizeSpeech(params, (err, data) => {
            if (err) {
                console.error('Erro ao sintetizar fala:', err);
            } else if (data.AudioStream instanceof Buffer) {
                // Salvar o arquivo de áudio
                const fs = require('fs');
                fs.writeFile('output.mp3', data.AudioStream, (err: any) => {
                    if (err) {
                        console.error('Erro ao salvar arquivo:', err);
                    } else {
                        console.log('Arquivo de áudio salvo como output.mp3');
                    }
                });
            }
        });
    }
    async getAudio(query: any) {
        const { idMessage } = query;

        if (this.checkIfFileExists(idMessage)) {
            try {
                const filepath = join(__dirname, '..', 'audio', `${idMessage}.wav`);
                return readFileSync(filepath);
            } catch (error) {
                throw new NotFoundException('Audio file not found');
            }
        }else{
            return await this.getTtsResponse(query);
        }

    }
}

export declare class TtsService {
    getTtsResponse(query: any): Promise<any>;
    checkIfFileExists(idMessage: string): boolean;
    getAudioAws(query: any): Promise<void>;
    getAudio(query: any): Promise<any>;
}

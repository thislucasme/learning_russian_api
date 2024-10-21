import { CorrectionTdo } from './tdo/correction';
import { GenerateResponseTdo } from './tdo/generateResponseTdo';
import { ResponseTdo } from './tdo/response';
export declare class CheckMessageService {
    generateResponse(generateResponseTdo: GenerateResponseTdo): Promise<ResponseTdo>;
    getCorrectionByUserText(text: string): Promise<CorrectionTdo>;
}

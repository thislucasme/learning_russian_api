import { CreateMessageTdo } from 'src/message/tdo/createmessageTdo';
import { CheckMessageService } from './checkmessage.service';
import { GenerateResponseTdo } from './tdo/generateResponseTdo';
export declare class CheckMessageController {
    private checkMessageService;
    constructor(checkMessageService: CheckMessageService);
    generateResponse(generateResponseTdo: GenerateResponseTdo): Promise<import("./tdo/response").ResponseTdo>;
    checkUserMessage(createMessageTdo: CreateMessageTdo): Promise<import("./tdo/correction").CorrectionTdo>;
}

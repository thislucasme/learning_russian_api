import { Module } from '@nestjs/common';
import { CheckMessageController } from './checkmessage.controller';
import { CheckMessageService } from './checkmessage.service';

@Module({
    imports: [],
    controllers: [CheckMessageController],
    providers: [CheckMessageService],
})
export class CheckMessageModule {}

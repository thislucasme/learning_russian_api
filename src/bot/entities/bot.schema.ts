import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type BotDocument = Bot & Document;

@Schema()
export class Bot {
    @Prop({ required: true })
    userId: string;

    @Prop({ default: Date.now })
    createdAt: Date;
}

export const BotSchema = SchemaFactory.createForClass(Bot);

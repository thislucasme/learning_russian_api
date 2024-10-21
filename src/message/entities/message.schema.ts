import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type MessageDocument = Message & Document;

@Schema()
export class Message {
    @Prop({ required: true })
    message: string;

    @Prop({ required: false })
    conversationId: string;

    audioId: string;

    @Prop({ default: Date.now })
    createdAt: Date;

    @Prop({ required: true })
    from: string;
}

export const MessageSchema = SchemaFactory.createForClass(Message);

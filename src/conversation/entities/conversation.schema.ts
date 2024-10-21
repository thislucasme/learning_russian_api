import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ConversationDocument = Conversation & Document;

@Schema()
export class Conversation {
    @Prop({ required: true })
    title: string;

    @Prop({ required: false })
    userId: string;

    @Prop({ required: false, default: "OPEN" })
    status: string;

    @Prop({ default: Date.now })
    createdAt: Date;
}

export const ConversationSchema = SchemaFactory.createForClass(Conversation);

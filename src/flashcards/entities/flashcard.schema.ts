import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type FlashcardDocument = Flashcard & Document;

@Schema()
export class Flashcard {
    @Prop({ required: true })
    front?: string;

    @Prop({ required: true })
    back?: string;

    @Prop({ default: 0 })
    interval?: number;

    @Prop({ default: 0 })
    repetition?: number;

    @Prop({ default: 2.5 })
    efactor?: number;

    @Prop({ default: Date.now })
    dueDate?: Date;

    @Prop({ required: true })
    conversationId?: string;

    audioId?: string;

    @Prop({ default: Date.now })
    createdAt?: Date;

    @Prop({ required: false })
    from?: string;

    @Prop({ required: false })
    userId?: string;
}

export const FlashcardSchema = SchemaFactory.createForClass(Flashcard);

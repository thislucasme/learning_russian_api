/// <reference types="mongoose/types/aggregate" />
/// <reference types="mongoose/types/callback" />
/// <reference types="mongoose/types/collection" />
/// <reference types="mongoose/types/connection" />
/// <reference types="mongoose/types/cursor" />
/// <reference types="mongoose/types/document" />
/// <reference types="mongoose/types/error" />
/// <reference types="mongoose/types/expressions" />
/// <reference types="mongoose/types/helpers" />
/// <reference types="mongoose/types/middlewares" />
/// <reference types="mongoose/types/indexes" />
/// <reference types="mongoose/types/models" />
/// <reference types="mongoose/types/mongooseoptions" />
/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/populate" />
/// <reference types="mongoose/types/query" />
/// <reference types="mongoose/types/schemaoptions" />
/// <reference types="mongoose/types/schematypes" />
/// <reference types="mongoose/types/session" />
/// <reference types="mongoose/types/types" />
/// <reference types="mongoose/types/utility" />
/// <reference types="mongoose/types/validation" />
/// <reference types="mongoose/types/virtuals" />
/// <reference types="mongoose/types/inferschematype" />
/// <reference types="mongoose/types/inferrawdoctype" />
import { Document } from 'mongoose';
export declare type FlashcardDocument = Flashcard & Document;
export declare class Flashcard {
    front?: string;
    back?: string;
    interval?: number;
    repetition?: number;
    efactor?: number;
    dueDate?: Date;
    conversationId?: string;
    audioId?: string;
    createdAt?: Date;
    from?: string;
    userId?: string;
}
export declare const FlashcardSchema: import("mongoose").Schema<Flashcard, import("mongoose").Model<Flashcard, any, any, any, Document<unknown, any, Flashcard> & Flashcard & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v?: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Flashcard, Document<unknown, {}, import("mongoose").FlatRecord<Flashcard>> & import("mongoose").FlatRecord<Flashcard> & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v?: number;
}>;

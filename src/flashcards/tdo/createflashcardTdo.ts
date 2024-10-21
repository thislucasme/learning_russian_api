// src/users/dto/create-user.dto.ts
import { IsString, IsEmail, IsNotEmpty, IsIn, IsInt, IsDateString } from 'class-validator';

export class CreateFlashcardTdo {
  @IsString()
  @IsNotEmpty()
  front: string;

  @IsString()
  @IsNotEmpty()
  back: string;

  @IsInt()
  @IsNotEmpty()
  interval?: number;

  @IsInt()
  @IsNotEmpty()
  repetition?: number;

  @IsInt()
  @IsNotEmpty()
  efactor?: number;

  @IsDateString()
  @IsNotEmpty()
  dueDate?: Date;

  @IsString()
  @IsNotEmpty()
  conversationId: string;

  @IsString()
  @IsNotEmpty()
  from: string;

  @IsString()
  @IsNotEmpty()
  userId: string;

  createdAt?: Date;

  audioId?: string;
}

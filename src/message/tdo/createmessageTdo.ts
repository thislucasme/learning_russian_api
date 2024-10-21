// src/users/dto/create-user.dto.ts
import { IsString, IsEmail, IsNotEmpty } from 'class-validator';

export class CreateMessageTdo {
  @IsString()
  @IsNotEmpty()
  message: string;

  @IsString()
  @IsNotEmpty()
  conversationId: string;

  @IsString()
  audioId?: string;
  
  @IsString()
  @IsNotEmpty()
  from: string;

  createdAt?: Date;
}

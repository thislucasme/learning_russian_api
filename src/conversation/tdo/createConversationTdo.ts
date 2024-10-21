// src/users/dto/create-user.dto.ts
import { IsString, IsEmail, IsNotEmpty } from 'class-validator';

export class CreateConversationTdo {
  @IsString()
  @IsNotEmpty()
  title?: string;

  @IsString()
  @IsNotEmpty()
  userId?: string;

  @IsString()
  @IsNotEmpty()
  status?: string;
  
  createdAt?: Date;
}

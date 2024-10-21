// src/users/dto/create-user.dto.ts
import { IsString, IsEmail, IsNotEmpty } from 'class-validator';

export class CreateBotTdo {
  @IsString()
  @IsNotEmpty()
  userId: string;
  
  createdAt?: Date;
}

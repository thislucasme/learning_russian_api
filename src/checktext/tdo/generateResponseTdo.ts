// src/users/dto/create-user.dto.ts
import { IsString, IsEmail, IsNotEmpty, IsIn, IsInt, IsDateString } from 'class-validator';

export class GenerateResponseTdo {
  @IsString()
  @IsNotEmpty()
  message: string;

  @IsString()
  @IsNotEmpty()
  messages: string[];
}

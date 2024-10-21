// src/users/dto/create-user.dto.ts
import { IsString, IsEmail, IsNotEmpty, IsIn, IsInt, IsDateString } from 'class-validator';

export class ResponseTdo {
  @IsString()
  @IsNotEmpty()
  text: string;
}

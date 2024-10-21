// src/users/dto/create-user.dto.ts
import { IsString, IsEmail, IsNotEmpty, IsIn, IsInt, IsDateString } from 'class-validator';

export class CorrectionTdo {
  @IsString()
  @IsNotEmpty()
  text_corrected: string;

  @IsString()
  @IsNotEmpty()
  explanation: string;
}

import { IsNotEmpty, IsString } from 'class-validator';

export class CreateUserTdo {
  @IsString()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  createdAt?: Date;
}

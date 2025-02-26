import { IsNotEmpty, IsString } from 'class-validator';

export class loginUserTdo {
  @IsString()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}

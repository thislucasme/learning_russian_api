import { IsNotEmpty, IsString } from 'class-validator';

export class UserTdoResponse {
  @IsString()
  @IsNotEmpty()
  userId: string;

  @IsString()
  @IsNotEmpty()
  username: string;

  @IsString()
  @IsNotEmpty()
  name: string;
}

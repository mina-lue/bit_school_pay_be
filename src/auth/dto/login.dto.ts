import { IsEmail, IsString } from 'class-validator';

export class LoginDto {
  @IsEmail()
  email: string;

  @IsString()
  password: string;
}

export class LoginResponseUserDto {
  id: string;
  firstName: string;
  middleName: string;
  lastName: string;
  email: string;
  phone: string;
}

export class LoginResponseDto {
  user: LoginResponseUserDto;
  backendTokens: {
    accessToken: string;
    refreshToken: string;
    expiresAt: number;
  };
}

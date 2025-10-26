import { IsEmail, IsString } from 'class-validator';
import { School } from 'src/domain/school.entity';

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
  role: 'SUPER_ADMIN' | 'ADMIN' | 'STAFF' | 'BASIC';
  schoolAsPrincipal: School | null;
  schoolAsStaff: School | null;
}

export class LoginResponseDto {
  user: LoginResponseUserDto;
  backendTokens: {
    accessToken: string;
    refreshToken: string;
    expiresAt: number;
  };
}

import { Injectable } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  refreshToken(user: any) {
    console.log(user);
  }
  login(dto: LoginDto) {
    console.log(dto);
  }
}

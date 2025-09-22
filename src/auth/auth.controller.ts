/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { Body, Controller, Post, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  createUser(@Body() dto) {
    console.log(dto);
    //return await this.userService.create(dto);
  }

  @Post('login')
  // await
  login(@Body() dto: LoginDto) {
    return this.authService.login(dto);
    //await return this.authService.login(dto);
  }

  //@UseGuards(JwtRefreshGuard)
  @Post('refresh')
  refreshToken(@Request() req) {
    return this.authService.refreshToken(req.user);
    //await return this.authService.refreshToken(req.user);
  }
}

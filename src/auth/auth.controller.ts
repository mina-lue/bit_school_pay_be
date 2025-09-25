/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { Body, Controller, Post, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { UsersService } from 'src/users/users.service';
//import { CreateUserDto, User } from 'src/users/domain/user.entity';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private userService: UsersService,
  ) {}

  /*
  @Post('register')
  createUser(@Body() dto: CreateUserDto): User {
    return this.userService.register(dto);
    //return await this.userService.register(dto);
  } */

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

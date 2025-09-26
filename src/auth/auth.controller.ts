/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { Body, Controller, Post, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto, LoginResponseDto } from './dto/login.dto';
import { UsersService } from 'src/users/users.service';
import {
  CreateUserDto,
  CreateUserResponseDto,
} from 'src/users/domain/user.entity';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private userService: UsersService,
  ) {}

  @Post('/signup')
  async createUser(@Body() dto: CreateUserDto): Promise<CreateUserResponseDto> {
    return await this.userService.register(dto);
  }

  @Post('/login')
  async login(@Body() dto: LoginDto): Promise<LoginResponseDto> {
    return await this.authService.login(dto);
  }

  //@UseGuards(JwtRefreshGuard)
  @Post('refresh')
  refreshToken(@Request() req) {
    return this.authService.refreshToken(req.user);
    //await return this.authService.refreshToken(req.user);
  }
}

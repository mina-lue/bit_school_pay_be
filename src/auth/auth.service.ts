import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { LoginDto, LoginResponseUserDto } from './dto/login.dto';
import { UsersService } from 'src/users/users.service';
import { compare } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

const ACCESS_TOKEN_EXPIRES_IN_SEC = 5 * 60 * 60; // 5 hours in seconds
const REFRESH_TOKEN_EXPIRES_IN_SEC = 10 * 24 * 60 * 60; // 10 days in seconds

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwt: JwtService,
  ) {}
  async refreshToken(tokenPayload: { username: string; sub: string }) {
    // tokenPayload is what you decoded/validated from the incoming refresh token
    const payload = {
      username: tokenPayload.username,
      sub: tokenPayload.sub,
    };

    const accessToken = await this.jwt.signAsync(payload, {
      secret: process.env.JWT_SECRET_KEY,
      expiresIn: ACCESS_TOKEN_EXPIRES_IN_SEC,
    });
    const refreshToken = await this.jwt.signAsync(payload, {
      secret: process.env.JWT_REFRESH_TOKEN_KEY,
      expiresIn: REFRESH_TOKEN_EXPIRES_IN_SEC,
    });
    const expiresAt = Date.now() + ACCESS_TOKEN_EXPIRES_IN_SEC * 1000;

    return {
      accessToken,
      refreshToken,
      expiresAt,
    };
  }

  async login(dto: LoginDto) {
    const user = await this.validateUser(dto);

    const payload = {
      username: user.email,
      sub: user.id,
      role: user.role,
    };

    const accessToken = await this.jwt.signAsync(payload, {
      secret: process.env.JWT_SECRET_KEY,
      expiresIn: ACCESS_TOKEN_EXPIRES_IN_SEC,
    });

    const refreshToken = await this.jwt.signAsync(payload, {
      secret: process.env.JWT_REFRESH_TOKEN_KEY,
      expiresIn: REFRESH_TOKEN_EXPIRES_IN_SEC,
    });

    const expiresAt = Date.now() + ACCESS_TOKEN_EXPIRES_IN_SEC * 1000;

    return {
      user,
      backendTokens: {
        accessToken,
        refreshToken,
        expiresAt,
      },
    };
  }

  async validateUser(dto: LoginDto): Promise<LoginResponseUserDto> {
    try {
      const user = await this.userService.findByEmail(dto.email);
      if (user && (await compare(dto.password, user.password))) {
        return user;
      }
    } catch {
      throw new NotFoundException('User Not Found');
    }
    throw new UnauthorizedException('Invalid credentials');
  }
}

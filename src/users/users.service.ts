import { Injectable } from '@nestjs/common';
import {
  CreateUserDto,
  CreateUserResponseDto,
  User,
} from './domain/user.entity';
import { PrismaService } from 'src/prisma.service';
import { hashSync } from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}
  /*
  find(id: string): User {
    return { id, firstName: 'User Name' };
  } 

  */
  async register(user: CreateUserDto): Promise<CreateUserResponseDto> {
    return await this.prisma.bitUser.create({
      data: {
        firstName: user.firstName,
        middleName: user.middleName,
        lastName: user.lastName,
        email: user.email,
        phone: user.phone,
        password: hashSync(user.password, 10),
      },
    });
  }

  async findByEmail(email: string): Promise<User> {
    return await this.prisma.bitUser.findFirstOrThrow({
      where: { email },
    });
  }
}

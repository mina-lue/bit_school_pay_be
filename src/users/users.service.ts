import { Injectable } from '@nestjs/common';
import { CreateUserDto, User } from './domain/user.entity';

@Injectable()
export class UsersService {
  find(id: string): User {
    return { id, firstName: 'User Name' };
  }

  register(user: CreateUserDto): User {
    return { id: 'id', firstName: user.firstName };
  }
}

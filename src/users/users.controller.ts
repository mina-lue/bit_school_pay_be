import { Controller, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './domain/user.entity';
//import { User } from './domain/user.entity';

@Controller('users')
export class UsersController {
  public constructor(private usersService: UsersService) {}

  /*
  @Get('/:id')
  get(@Param('id') id: string): User {
    return this.usersService.find(id);
  }
    */

  @Post('/register/staff')
  async registerStaff(staff: CreateUserDto) {
    if (!staff?.schoolId) {
      throw Error('Staff has no school associated');
    }
    staff.role = 'STAFF';
    return await this.usersService.register(staff);
  }
}

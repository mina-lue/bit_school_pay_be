import { Controller } from '@nestjs/common';
import { UsersService } from './users.service';
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
}

import { Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto, User } from './domain/user.entity';
import { JwtGuard } from 'src/auth/gaurd/jwt.guard';
import { Request } from 'express';
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

  @Get('/my-staffs')
  @UseGuards(JwtGuard)
  async getMyStaffs(@Req() req: Request): Promise<User[]> {
    if (!req.user) {
      throw new Error('User email not found in request');
    }
    const user = await this.usersService.findByEmail(req.user.username);

    if (!user?.schoolAsPrincipal?.id) {
      throw Error('User Not Admin!');
    }

    return await this.usersService.getMyStaffs(user.schoolAsPrincipal.id);
  }
}

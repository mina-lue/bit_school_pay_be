import {
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
  Req,
  Query,
} from '@nestjs/common';
import { StudentsService } from './students.service';
import { Student } from 'generated/prisma';
import { RegisterStudentDto } from './domain/student.entity';
import { JwtGuard } from 'src/auth/gaurd/jwt.guard';
import { Request } from 'express';
import { UsersService } from 'src/users/users.service';
import { StudentsFilter } from 'src/domain/filter.model';

@Controller('students')
export class StudentsController {
  public constructor(
    private studentService: StudentsService,
    private usersService: UsersService,
  ) {}

  @Get()
  @UseGuards(JwtGuard)
  async getAll(): Promise<Student[]> {
    return await this.studentService.getAll();
  }

  @Post('/new')
  @UseGuards(JwtGuard)
  async register(@Body() student: RegisterStudentDto): Promise<Student> {
    return await this.studentService.register(student);
  }

  // Get school students by checking the clients bearer token from the request

  @Get('/my-school')
  @UseGuards(JwtGuard)
  async getAllForMySchool(
    @Req() req: Request,
    @Query('page') page: number,
    @Query('size') size: number,
  ): Promise<Student[]> {
    if (!req.user?.username) {
      throw new Error('User email not found in request');
    }
    const user = await this.usersService.findByEmail(req.user.username);
    const filter: StudentsFilter = {
      page,
      size,
    };
    console.log(user);
    if (!user?.schoolAsPrincipal) throw new Error('Unknown User or School!');

    return this.studentService.getAllForSchool(
      user.schoolAsPrincipal.id,
      filter,
    );
  }
}

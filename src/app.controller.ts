import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { StudentsService } from './students/students.service';
import { School } from 'generated/prisma';
import { RegisterSchoolDto } from './domain/school.entity';
import { JwtGuard } from './auth/gaurd/jwt.guard';
import { Request } from 'express';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private studentService: StudentsService,
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('/schools')
  @UseGuards(JwtGuard)
  async getAllSchools(@Req() req: Request): Promise<School[]> {
    if (!req?.user) {
      throw new Error('User not found in request');
    } else if (req.user.role !== 'SUPER_ADMIN') {
      throw new Error('No privilege to access schools');
    }
    return await this.appService.getSchools();
  }

  @Post('/register-school')
  @UseGuards(JwtGuard)
  async registerSchool(
    @Body() school: RegisterSchoolDto,
    @Req() req: Request,
  ): Promise<School> {
    if (!req?.user) {
      throw new Error('User not found in request');
    } else if (req.user.role !== 'SUPER_ADMIN') {
      throw new Error('No privilege to register schools');
    }
    return this.appService.registerSchool(school);
  }
}

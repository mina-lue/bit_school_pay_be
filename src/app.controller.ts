import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { StudentsService } from './students/students.service';
import { School } from 'generated/prisma';
import { RegisterSchoolDto } from './domain/school.entity';

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
  async getAllSchools(): Promise<School[]> {
    return await this.appService.getSchools();
  }

  @Post('/register-school')
  async registerSchool(@Body() school: RegisterSchoolDto): Promise<School> {
    return this.appService.registerSchool(school);
  }
}

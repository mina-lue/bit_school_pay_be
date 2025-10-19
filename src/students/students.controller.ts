import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { StudentsService } from './students.service';
import { Student } from 'generated/prisma';
import { RegisterStudentDto } from './domain/student.entity';
import { JwtGuard } from 'src/auth/gaurd/jwt.guard';

@Controller('students')
export class StudentsController {
  public constructor(private studentService: StudentsService) {}

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
}

import { Body, Controller, Get, Post } from '@nestjs/common';
import { StudentsService } from './students.service';
import { Student } from 'generated/prisma';
import { RegisterStudentDto } from './domain/student.entity';

@Controller('students')
export class StudentsController {
  public constructor(private studentService: StudentsService) {}

  @Get()
  async getAll(): Promise<Student[]> {
    return await this.studentService.getAll();
  }

  @Post('/new')
  async register(@Body() student: RegisterStudentDto): Promise<Student> {
    return await this.studentService.register(student);
  }
}

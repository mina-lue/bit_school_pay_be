import { Body, Controller, Get, Post } from '@nestjs/common';
import { StudentsService } from './students.service';
import { RegisterStudentDto, Student } from './domain/student.entity';

@Controller('students')
export class StudentsController {
  public constructor(private studentService: StudentsService) {}

  @Get()
  getAll(): Promise<Student[]> {
    return this.studentService.getAll();
  }

  @Post('/new')
  register(@Body() student: RegisterStudentDto): Student {
    return this.studentService.register(student);
  }
}

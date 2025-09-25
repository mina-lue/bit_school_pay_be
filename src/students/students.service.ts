import { Injectable } from '@nestjs/common';
import { RegisterStudentDto, Student } from './domain/student.entity';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class StudentsService {
  constructor(private prisma: PrismaService) {}

  async getAll(): Promise<Student[]> {
    return await this.prisma.student.findMany();
  }

  register(student: RegisterStudentDto): Student {
    console.log('created new student : ', student);
    return {
      id: '1',
      subscribed: false,
      class: student.class,
      grade: student.grade,
      lastName: student.lastName,
      middleName: student.middleName,
      firstName: student.firstName,
    };
  }
}

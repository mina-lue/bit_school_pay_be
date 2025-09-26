import { Injectable } from '@nestjs/common';
import { Student } from 'generated/prisma';
import { PrismaService } from 'src/prisma.service';
import { RegisterStudentDto } from './domain/student.entity';

@Injectable()
export class StudentsService {
  constructor(private prisma: PrismaService) {}

  async getAll(): Promise<Student[]> {
    return await this.prisma.student.findMany();
  }

  async register(student: RegisterStudentDto): Promise<Student> {
    return await this.prisma.student.create({
      data: {
        firstName: student.firstName,
        middleName: student.middleName,
        lastName: student.lastName,
        class: student.class,
        grade: student.grade,
        subscribed: false,
        phone: student?.phone,
        email: student?.email,
        schoolId: student.schoolId,
      },
    });
  }
}

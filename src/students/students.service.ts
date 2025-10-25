import { Injectable } from '@nestjs/common';
import { Student } from 'generated/prisma';
import { PrismaService } from 'src/prisma.service';
import { RegisterStudentDto } from './domain/student.entity';
import { StudentsFilter } from 'src/domain/filter.model';

@Injectable()
export class StudentsService {
  constructor(private prisma: PrismaService) {}

  async getAll(): Promise<Student[]> {
    return await this.prisma.student.findMany();
  }

  async getAllForSchool(
    schoolId: string,
    filter: StudentsFilter,
  ): Promise<Student[]> {
    return await this.prisma.student.findMany({
      take: filter.size,
      skip: (filter.page - 1) * filter.size,
      orderBy: {
        firstName: 'asc',
      },

      where:
        filter.subscribed !== undefined || filter.subscribed !== null
          ? { schoolId }
          : { schoolId, subscribed: filter.subscribed },
    });
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

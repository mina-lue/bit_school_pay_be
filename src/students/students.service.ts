import { Injectable } from '@nestjs/common';
import { RegisterStudentDto, Student } from './domain/student.entity';

@Injectable()
export class StudentsService {
  getAll(): Student[] {
    return [];
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

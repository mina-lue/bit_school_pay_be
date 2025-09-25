import { Student } from '../students/domain/student.entity';

export interface School {
  id: string;
  name: string;
  email: string;
  students: Student[];
}

export interface RegisterSchoolDto {
  name: string;
  email: string;
  students?: Student[];
}

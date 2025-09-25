import { School } from 'src/domain/school.entity';
import { Payment } from 'src/payments/domain/payment.entity';

export interface Student {
  id: string;
  firstName: string;
  middleName: string;
  lastName: string;
  grade: number;
  class: string;
  subscribed: boolean;
  phone?: string;
  email?: string;
  school: School;
  schoolId: string;
  payments: Payment[];
  createdAt: Date;
  updatedAt: Date;
}

export interface RegisterStudentDto {
  firstName: string;
  middleName: string;
  lastName: string;
  grade: number;
  class: string;
  schoolId: string;
}

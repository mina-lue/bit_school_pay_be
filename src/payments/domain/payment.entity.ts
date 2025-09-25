import { Student } from 'src/students/domain/student.entity';
import { User } from 'src/users/domain/user.entity';

export interface Payment {
  id: string;
  type: PaymentType;
  amount: number;
  studentId: string;
  payerId: string;
  student: Student;
  paidBy: User;
  paidAt: Date;
}

enum PaymentType {
  MONTHLY_FEE,
  BUS_FEE,
  OTHERS,
}

export interface RegisterPaymentDto {
  amount: number;
  madeAt: Date;
  type: PaymentType;
  student: Student;
  paidBy: User;
}

import { Student } from 'src/students/domain/student.entity';

export interface Payment {
  id: string;
  amount: number;
  madeAt: Date;
  type: PaymentType;
  student: Student;
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
}

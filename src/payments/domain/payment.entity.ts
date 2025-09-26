import { PaymentType } from 'generated/prisma';

export interface Payment {
  id: string;
  type: PaymentType;
  amount: number;
  studentId: string;
  payerId: string;
  paidAt: Date;
  schoolId: string;
}

export interface RegisterPaymentDto {
  type: PaymentType;
  amount: number;
  studentId: string;
  payerId: string;
  paidAt: Date;
  schoolId: string;
}

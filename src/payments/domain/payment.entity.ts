export interface Payment {
  id: string;
  type: PaymentType;
  amount: number;
  studentId: string;
  payerId: string;
  paidAt: Date;
  schoolId: string;
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
  studentId: string;
  payerId: string;
  schoolId: string;
}

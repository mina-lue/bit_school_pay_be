import { Injectable } from '@nestjs/common';
import { Payment, RegisterPaymentDto } from './domain/payment.entity';

@Injectable()
export class PaymentsService {
  register(paymentDto: RegisterPaymentDto): Payment {
    return {
      id: '1',
      amount: paymentDto.amount,
      paidAt: paymentDto.madeAt,
      type: paymentDto.type,
      student: paymentDto.student,
      studentId: '',
      payerId: '',
      paidBy: {
        firstName: '',
        LastName: '',
        middleName: '',
        password: '',
        payments: [],
        email: '',
        id: '',
      },
    };
  }
  getAll(): Payment[] {
    return [];
  }
}

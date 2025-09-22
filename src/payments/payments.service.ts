import { Injectable } from '@nestjs/common';
import { Payment, RegisterPaymentDto } from './domain/payment.entity';

@Injectable()
export class PaymentsService {
  register(paymentDto: RegisterPaymentDto): Payment {
    return {
      id: '1',
      amount: paymentDto.amount,
      madeAt: paymentDto.madeAt,
      type: paymentDto.type,
      student: paymentDto.student,
    };
  }
  getAll(): Payment[] {
    return [];
  }
}

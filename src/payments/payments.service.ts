import { Injectable } from '@nestjs/common';
import { Payment, RegisterPaymentDto } from './domain/payment.entity';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class PaymentsService {
  constructor(private prisma: PrismaService) {}
  async register(paymentDto: RegisterPaymentDto): Promise<Payment> {
    return await this.prisma.payment.create({
      data: {
        type: paymentDto.type,
        amount: paymentDto.amount,
        studentId: paymentDto.studentId,
        paidAt: paymentDto.paidAt,
        payerId: paymentDto.payerId,
        schoolId: paymentDto.schoolId,
      },
    });
  }

  async getAll(): Promise<Payment[]> {
    return await this.prisma.payment.findMany();
  }
}

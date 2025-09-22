import { Body, Controller, Get, Post } from '@nestjs/common';
import { Payment, RegisterPaymentDto } from './domain/payment.entity';
import { PaymentsService } from './payments.service';

@Controller('payments')
export class PaymentsController {
  public constructor(private paymentsService: PaymentsService) {}

  @Get()
  getAll(): Payment[] {
    return this.paymentsService.getAll();
  }

  @Post()
  register(@Body() paymentDto: RegisterPaymentDto): Payment {
    return this.paymentsService.register(paymentDto);
  }
}

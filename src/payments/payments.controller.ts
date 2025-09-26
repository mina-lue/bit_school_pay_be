import { Body, Controller, Get, Post } from '@nestjs/common';
import { Payment, RegisterPaymentDto } from './domain/payment.entity';
import { PaymentsService } from './payments.service';

@Controller('payments')
export class PaymentsController {
  public constructor(private paymentsService: PaymentsService) {}

  @Get()
  async getAll(): Promise<Payment[]> {
    return this.paymentsService.getAll();
  }

  @Get('/my_school')
  getMySchoolRevenues() {
    //TODO  implement this!
  }

  @Post('/new')
  register(@Body() paymentDto: RegisterPaymentDto): Promise<Payment> {
    return this.paymentsService.register(paymentDto);
  }
}

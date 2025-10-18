import { Body, Controller, Get } from '@nestjs/common';
import { TelebirrService } from './telebirr.service';
import { CreateOrderDataDto } from './dto/order.create';

@Controller('telebirr')
export class TelebirrController {
  constructor(private readonly telebirrService: TelebirrService) {}

  @Get('initiate')
  async initiatePayment(@Body() createOrderData: CreateOrderDataDto) {
    const response = await this.telebirrService.initiatePayment(
      createOrderData.title,
      createOrderData.amount,
    );
    return { response };
  }
}

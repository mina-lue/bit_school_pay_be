import { Module } from '@nestjs/common';
import { TelebirrService } from './telebirr.service';
import { TelebirrController } from './telebirr.controller';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule],
  providers: [TelebirrService],
  controllers: [TelebirrController],
})
export class TelebirrModule {}

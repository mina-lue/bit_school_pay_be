/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { StudentsModule } from './students/students.module';
import { StudentsController } from './students/students.controller';
import { StudentsService } from './students/students.service';
import { PaymentsModule } from './payments/payments.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { PrismaService } from './prisma.service';
import { TelebirrModule } from './telebirr/telebirr.module';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from './users/users.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env`,
    }),
    StudentsModule,
    PaymentsModule,
    AuthModule,
    UsersModule,
    TelebirrModule,
  ],
  controllers: [AppController, StudentsController],
  providers: [
    AppService,
    StudentsService,
    PrismaService,
    JwtService,
    UsersService,
  ],
})
export class AppModule {}

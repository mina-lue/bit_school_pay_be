import { Module } from '@nestjs/common';
import { StudentsController } from './students.controller';
import { StudentsService } from './students.service';
import { PrismaService } from 'src/prisma.service';
import { JwtService } from '@nestjs/jwt';

@Module({
  controllers: [StudentsController],
  providers: [StudentsService, PrismaService, JwtService],
})
export class StudentsModule {}

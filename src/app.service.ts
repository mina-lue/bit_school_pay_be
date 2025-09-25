import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { School } from 'generated/prisma';
import { RegisterSchoolDto } from './domain/school.entity';

@Injectable()
export class AppService {
  constructor(private prisma: PrismaService) {}

  getHello(): string {
    return 'Hello World!';
  }

  async getSchools(): Promise<School[]> {
    return await this.prisma.school.findMany();
  }

  async registerSchool(school: RegisterSchoolDto): Promise<School> {
    return await this.prisma.school.create({
      data: {
        name: school.name,
        email: school.email,
      },
    });
  }
}

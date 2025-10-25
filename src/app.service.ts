import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { School } from 'generated/prisma';
import { RegisterSchoolDto } from './domain/school.entity';
import { UsersService } from './users/users.service';

@Injectable()
export class AppService {
  constructor(
    private prisma: PrismaService,
    private usersService: UsersService,
  ) {}

  getHello(): string {
    return 'Welcome to Bit School Pay!';
  }

  async getSchools(): Promise<School[]> {
    return await this.prisma.school.findMany();
  }

  async registerSchool(dto: RegisterSchoolDto): Promise<School> {
    const admin = await this.usersService.register({
      ...dto.principal,
      role: 'ADMIN',
    });

    return await this.prisma.school.create({
      data: {
        name: dto.school.name,
        email: dto.school.email,
        principalId: admin.id,
      },
    });
  }
}

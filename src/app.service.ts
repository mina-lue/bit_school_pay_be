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

  async getOverallData(username: string): Promise<any> {
    const overallData = {};
    const admin = await this.usersService.findByEmail(username);
    const school = admin.schoolAsPrincipal;
    if (!school) throw new Error('School Not Found');
    const students = this.prisma.student.count({
      where: {
        schoolId: {
          equals: school.id,
        },
      },
    });

    overallData['admin'] = admin;
    overallData['school'] = school;
    overallData['students'] = students;
    return overallData;
  }
}

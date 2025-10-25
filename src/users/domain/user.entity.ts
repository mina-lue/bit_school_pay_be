import { School } from 'src/domain/school.entity';

export interface CreateUserDto {
  firstName: string;
  middleName: string;
  lastName: string;
  email: string;
  phone: string;
  password: string;
  schoolId?: string;
  role: 'SUPER_ADMIN' | 'ADMIN' | 'STAFF' | 'BASIC';
}

export interface CreateUserResponseDto {
  id: string;
  firstName: string;
  middleName: string;
  lastName: string;
  email: string;
  phone: string;
  role: 'SUPER_ADMIN' | 'ADMIN' | 'STAFF' | 'BASIC';
}

export interface User {
  id: string;
  firstName: string;
  middleName: string;
  lastName: string;
  email: string;
  phone: string;
  password: string;
  schoolId: string | null;
  role: 'SUPER_ADMIN' | 'ADMIN' | 'STAFF' | 'BASIC';
  schoolAsPrincipal: School | null;
  schoolAsStaff: School | null;
}

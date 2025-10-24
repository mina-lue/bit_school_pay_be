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
}

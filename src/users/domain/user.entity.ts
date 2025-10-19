export interface CreateUserDto {
  firstName: string;
  middleName: string;
  lastName: string;
  email: string;
  phone: string;
  password: string;
  schoolId?: string;
}

export interface CreateUserResponseDto {
  firstName: string;
  middleName: string;
  lastName: string;
  email: string;
  phone: string;
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
}

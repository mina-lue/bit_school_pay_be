export interface Student {
  id: string;
  firstName: string;
  middleName: string;
  lastName: string;
  grade: number;
  class: string;
  subscribed: boolean;
  phone?: string;
  email?: string;
  schoolId: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface RegisterStudentDto {
  firstName: string;
  middleName: string;
  lastName: string;
  grade: number;
  class: string;
  phone?: string;
  email?: string;
  schoolId: string;
}

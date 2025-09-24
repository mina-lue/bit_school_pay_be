export class Student {
  id: string;
  firstName: string;
  middleName: string;
  lastName: string;
  grade: number;
  class: string;
  subscribed: boolean;
}

export interface RegisterStudentDto {
  firstName: string;
  middleName: string;
  lastName: string;
  grade: number;
  class: string;
}

import { Payment } from 'src/payments/domain/payment.entity';

export interface CreateUserDto {
  firstName: string;
  /*
   middleName: string,
   lastName: string,
   role: 'ADMIN' | 'PARENT',   // the parent of particular student should be able to see the former transactions made for the student.
   email: string,
   phone: string
  */
}

export interface User {
  id: string;
  firstName: string;
  middleName: string;
  LastName: string;
  email: string;
  password: string;
  payments: Payment[];
}

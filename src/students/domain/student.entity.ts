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

/* 

# The the schema models to be incorporated to prisma cli.

model Student {
  id String @id @default(uuid())
  firstName String 
  middleName String 
  lastName String
  phone String?
  email String? 
  class String
  grade Int
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}

model Payment {
  id String @id @default(uuid())
  type PaymentType
  amount Int
  createdAt DateTime @default(now())
}

enum PaymentType {
  MONTHLY_FEE
  BUS_FEE
  OTHERS
}

*/

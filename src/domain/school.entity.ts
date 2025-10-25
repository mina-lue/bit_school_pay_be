export interface School {
  id: string;
  name: string;
  email: string;
  principalId: string;
}

export interface RegisterSchoolDto {
  school: {
    name: string;
    email: string;
  };
  principal: {
    firstName: string;
    middleName: string;
    lastName: string;
    email: string;
    phone: string;
    password: string;
  };
}

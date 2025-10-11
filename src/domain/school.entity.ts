export interface School {
  id: string;
  name: string;
  email: string;
  principalId: string;
}

export interface RegisterSchoolDto {
  name: string;
  email: string;
  principalId: string;
}

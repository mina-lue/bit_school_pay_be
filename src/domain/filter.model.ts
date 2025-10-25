export interface StudentsFilter {
  page: number;
  size: number;
  schoolId?: string;
  grade?: string;
  section?: string;
  subscribed?: boolean;
  busFeeUnpaid?: boolean;
  tuitionFeeUnpaid?: boolean;
}

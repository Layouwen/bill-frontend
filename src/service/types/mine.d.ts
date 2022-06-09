type UserInfo = {
  id: number;
  userId: string;
  name: string;
  username: string;
  avatar: string;
  checkIn: boolean;
  checkInKeep: number;
  checkInAll: number;
  recordCount: number;
  billRecord: BillRecordType;
};

type BillRecordType = {
  expend: number;
  income: number;
  month: number;
  surplus: number;
};

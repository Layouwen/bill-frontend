type BillItemDto = {
  income: number;
  expand: number;
  balance: number;
};

type BillDto = {
  month: {
    [month: string]: BillItemDto;
  };
  all: BillItemDto;
};

type GetRecordType = {
  startDate: string;
  endDate?: string;
};

type RecordType = {
  remark: string;
  categoryId: number;
  type: string;
  amount: string;
  time: string;
};

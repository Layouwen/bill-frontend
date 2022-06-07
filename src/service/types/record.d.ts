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

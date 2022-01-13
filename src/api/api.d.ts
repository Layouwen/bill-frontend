interface BaseResponse<T> {
  statusCode: number;
  message: string;
  data: T;
}

interface BaseResponseDto<T> {
  statusCode: number;
  message: string;
  data: T;
}

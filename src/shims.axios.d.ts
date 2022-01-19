// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { AxiosRequestConfig } from 'axios';

declare module 'axios' {
  export interface AxiosRequestConfig {
    loading?: boolean;
  }
}

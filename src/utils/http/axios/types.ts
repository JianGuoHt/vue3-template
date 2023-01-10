import type { AxiosRequestConfig } from 'axios';

export interface CreateAxiosOptions extends AxiosRequestConfig {
  cus?: boolean;
}

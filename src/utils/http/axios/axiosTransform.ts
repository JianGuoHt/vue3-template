import type { AxiosRequestConfig, AxiosResponse } from 'axios';

import type { RequestOptions, Result } from '/#/axios';

export interface CreateAxiosOptions extends AxiosRequestConfig {
  requestOptions: RequestOptions;
  transform: AxiosTransform;
}

export abstract class AxiosTransform {
  /**
   * @description 请求前数据处理
   *
   */
  beforeRequestHook?: (config: AxiosRequestConfig, options: RequestOptions) => AxiosRequestConfig;

  /**
   * @description 请求成功数据处理
   */
  transformRequestHook?: (res: AxiosResponse<Result>, options: RequestOptions) => any;

  /**
   * @description 请求失败处理
   */
  requestCatchHook?: (e: Error) => Promise<any>;

  /**
   * @description 请求之前的拦截器
   */
  requestInterceptors?: (
    config: AxiosRequestConfig,
    options: CreateAxiosOptions,
  ) => AxiosRequestConfig;

  /**
   * @description 请求之后的拦截器
   */
  responseInterceptors?: (response: AxiosResponse) => AxiosResponse;

  /**
   * @description 请求之前的拦截器错误处理
   */
  requestInterceptorsCatch?: (err: Error) => void;

  /**
   * @description 请求之后的拦截器错误处理
   */
  responseInterceptorsCatch?: (err: Error) => void;
}

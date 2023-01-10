import type { AxiosHeaders, AxiosInstance, AxiosRequestConfig } from 'axios';
import type { CreateAxiosOptions } from './types';
import axios from 'axios';
import { cloneDeep } from 'lodash-es';

export class VAxios {
  private axiosInstance: AxiosInstance;
  private options: object;

  constructor(options: CreateAxiosOptions) {
    this.options = options;
    // 创建自定义配置的axios实例
    this.axiosInstance = axios.create(options);
  }

  getAxios(): AxiosInstance {
    return this.axiosInstance;
  }

  /**
   * @description 设置默认请求头
   * @param headers
   */
  setHeader(headers: AxiosHeaders) {
    Object.assign(this.axiosInstance.defaults.headers, headers);
  }

  request(config: AxiosRequestConfig) {
    const conf: AxiosRequestConfig = cloneDeep(config);

    return new Promise((resolve, reject) => {
      this.axiosInstance
        .request(conf)
        .then((res) => {
          resolve(res);
        })
        .catch((e) => {
          reject(e);
        });
    });
  }
}

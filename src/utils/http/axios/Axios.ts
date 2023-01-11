import type { AxiosHeaders, AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import type { RequestOptions, Result } from '/#/axios';
import type { CreateAxiosOptions } from './axiosTransform';
import axios from 'axios';
import { cloneDeep } from 'lodash-es';
import { isFunction } from '/@/utils/is';

export class VAxios {
  private axiosInstance: AxiosInstance;
  private options: CreateAxiosOptions;

  constructor(options: CreateAxiosOptions) {
    this.options = options;
    // 创建自定义配置的axios实例
    this.axiosInstance = axios.create(options);
    this;
  }

  getAxios(): AxiosInstance {
    return this.axiosInstance;
  }

  getTransform() {
    const { transform } = this.options;
    return transform;
  }

  /**
   * @description 设置默认请求头
   * @param headers
   */
  setHeader(headers: AxiosHeaders) {
    Object.assign(this.axiosInstance.defaults.headers, headers);
  }

  request<T = any>(config: AxiosRequestConfig, options?: RequestOptions): Promise<T> {
    let conf: AxiosRequestConfig = cloneDeep(config);
    const transform = this.getTransform();

    const { requestOptions } = this.options;

    const opt: RequestOptions = Object.assign({}, requestOptions, options);

    const { beforeRequestHook, transformRequestHook, requestCatchHook } = transform || {};

    if (beforeRequestHook && isFunction(beforeRequestHook)) {
      conf = beforeRequestHook(conf, opt);
    }

    return new Promise((resolve, reject) => {
      this.axiosInstance
        .request(conf)
        .then((res: AxiosResponse<Result>) => {
          if (transformRequestHook && isFunction(transformRequestHook)) {
            try {
              const ret = transformRequestHook(res, opt);
              resolve(ret);
            } catch (err) {
              reject(err || new Error('request error'));
            }
          }
          resolve(res as unknown as Promise<T>);
        })
        .catch((e) => {
          if (requestCatchHook && isFunction(requestCatchHook)) {
            const err = requestCatchHook(e);
            reject(err);
          }
          reject(e);
        });
    });
  }

  setupInstance() {
    const transform = this.getTransform();
    if (!transform) {
      return;
    }

    const {
      requestInterceptors,
      requestInterceptorsCatch,
      responseInterceptors,
      responseInterceptorsCatch,
    } = transform;

    // 请求拦截器
    this.axiosInstance.interceptors.request.use((config: AxiosRequestConfig) => {
      if (requestInterceptors && isFunction(requestInterceptors)) {
        config = requestInterceptors(config, this.options);
      }
      return config;
    });

    // 请求错误拦截器
    requestInterceptorsCatch &&
      isFunction(requestInterceptorsCatch) &&
      this.axiosInstance.interceptors.response.use(undefined, requestInterceptorsCatch);

    // 响应拦截器
    this.axiosInstance.interceptors.response.use((response: AxiosResponse) => {
      if (responseInterceptors && isFunction(responseInterceptors)) {
        response = responseInterceptors(response);
      }
      return response;
    });

    // 响应错误拦截器
    responseInterceptorsCatch &&
      isFunction(responseInterceptorsCatch) &&
      this.axiosInstance.interceptors.response.use(undefined, responseInterceptorsCatch);
  }
}

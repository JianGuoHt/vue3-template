import { ResultEnum } from '/@/enums/httpEnum';
import { deepMerge } from '/@/utils';

import { VAxios } from './Axios';
import type { AxiosTransform, CreateAxiosOptions } from './axiosTransform';
import { checkStatus } from './checkStatus';

const transform: AxiosTransform = {
  // 请求前数据处理
  beforeRequestHook: (config, options) => {
    return config;
  },

  // 请求成功数据处理
  transformRequestHook: (response, options) => {
    const { isTransformResponse, isReturnNativeResponse, errorMessageMode = 'message' } = options;

    // 不需要对数据进行任何处理
    if (!isTransformResponse) {
      return response;
    }

    const { data } = response;

    // 是否返回原生响应头 比如：需要获取响应头时使用该属性
    const res = isReturnNativeResponse ? response : response.data;

    if (!data) {
      throw new Error('请求出错， 请稍后重试');
    }

    const { code, message } = data;

    const hasSuccess = code && code === ResultEnum.SUCCESS;

    // 状态码为成功
    if (hasSuccess) {
      return res;
    }

    const errMessage = checkStatus(code, message, errorMessageMode);

    throw new Error(errMessage);
  },

  // 请求之前的拦截器
  requestInterceptors(config, options) {
    return config;
  },

  // 服务器响应拦截器
  // 2xx 范围内的状态码都会触发该函数。
  responseInterceptors(response) {
    return response;
  },

  // 服务器响应错误拦截器
  // 超出 2xx 范围的状态码都会触发该函数。
  responseInterceptorsCatch(err) {
    return Promise.reject(err);
  },
};

function createAxios(options?: Partial<CreateAxiosOptions>) {
  const opt: CreateAxiosOptions = {
    timeout: 10 * 1000,
    baseURL: '/api',
    requestOptions: {
      apiUrl: '/api',
      // 需要对返回的数据进行处理
      isTransformResponse: true,
      // 不要要原生响应头数据
      isReturnNativeResponse: false,
    },
    transform,
  };

  return new VAxios(deepMerge(opt, options || {}) as CreateAxiosOptions);
}

export const http = createAxios();

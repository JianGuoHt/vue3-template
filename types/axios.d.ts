export interface RequestOptions {
  // 请求地址
  apiUrl?: string;
  // 不进行任何处理，直接返回数据
  isTransformResponse?: boolean;
  // 是否需要原生响应头数据
  isReturnNativeResponse?: boolean;
  // 请求失败消息提示类型
  errorMessageMode?: ErrorMessageMode;
}

export type ErrorMessageMode = 'message' | 'messageBox';

// 接口返回数据类型
export interface Result<T = any> {
  code: number;
  type?: 'success' | 'error';
  message: string;
  result?: T;
}

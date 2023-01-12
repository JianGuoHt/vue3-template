// 接口数据格式采用统一格式返回
type CodeValue = 200 | 500;

interface Response {
  code: CodeValue;
  msg: string;
  data?: any;
}

export function result(options: Response, moreOptions?: object) {
  return Object.assign(options, moreOptions || {});
}

export function resultSuccess<T = Recordable>(data: T, options?: object) {
  return result(
    {
      code: 200,
      msg: 'ok',
      data,
    },
    options,
  );
}

export function resultError(msg = 'Request failed', options?: object) {
  return result(
    {
      code: 500,
      msg,
    },
    options,
  );
}

export interface requestParams {
  method: string;
  body: any;
  headers?: { authorization?: string };
  query: any;
}

/**
 * @description 本函数用于从request数据中获取token，请根据项目的实际情况修改
 *
 */
export function getRequestToken({ headers }: requestParams): string | undefined {
  return headers?.authorization;
}

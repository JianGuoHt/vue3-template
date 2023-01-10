import type { CreateAxiosOptions } from './types';
import { VAxios } from './Axios';
import { deepMerge } from '@/utils';

function createAxios(opt?: Partial<CreateAxiosOptions>) {
  return new VAxios(
    deepMerge(
      {
        timeout: 10 * 1000,
        baseURL: '/api',
      } as CreateAxiosOptions,
      opt || {},
    ),
  );
}

export const http = createAxios();

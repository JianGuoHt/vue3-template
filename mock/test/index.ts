import { MockMethod } from 'vite-plugin-mock';
import { resultError } from '../_util';

const api: MockMethod[] = [
  {
    url: '/api/test/error',
    method: 'get',
    response: resultError(),
  },
];

export default api;

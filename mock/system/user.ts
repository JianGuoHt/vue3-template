import type { MockMethod } from 'vite-plugin-mock';
import Mock from 'mockjs';
import { resultSuccess } from '../_util';

const Random = Mock.Random;

const token = Random.string('upper', 32, 32);

const api: MockMethod[] = [
  {
    url: '/api/login',
    method: 'post',
    timeout: 3000,
    response: resultSuccess(undefined, { token }),
  },
  {
    url: '/api/userInfo',
    method: 'post',
    timeout: 10,
    response: resultSuccess(undefined, {
      permissions: ['*:*:*'],
      roles: ['admin'],
      user: {
        userId: 1,
        avatar: '',
      },
    }),
  },
];

export default api;

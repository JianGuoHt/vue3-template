import { http } from '/@/utils/http/axios';

export function login(data: any) {
  return http.request({
    url: '/login',
    method: 'POST',
    data,
  });
}

export function getUserInfo() {
  return http.request({
    url: '/userInfo',
    method: 'POST',
  });
}

import { http } from '/@/utils/http/axios';

export function getError() {
  return http.request(
    {
      method: 'GET',
      url: '/test/error',
    },
    {
      isShowErrorMessage: true,
    },
  );
}

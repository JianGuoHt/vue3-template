import { Router } from 'vue-router';
import { StorageEnum } from '../enums/storageEnum';
import { storage } from '../utils/Storage';

// 白名单
const whitePathList = ['/login'];

export function createRouterGuards(router: Router) {
  const loadingBar = window['$loadingBar'];

  router.beforeEach((to, from, next) => {
    loadingBar && loadingBar.start();

    // 白名单地址，允许通过
    if (whitePathList.includes(to.path)) {
      next();
      return;
    }

    const token = storage.get(StorageEnum.TOKEN_KEY);

    if (!token) {
      const redirectLogin: { path: string; replace: boolean; query?: Recordable<string> } = {
        path: '/login',
        replace: true,
      };

      if (to.path) {
        redirectLogin.query = {
          ...redirectLogin.query,
          redirect: to.path,
        };
      }

      next(redirectLogin);
      return;
    }
    next();
  });

  router.afterEach((to, from, failure) => {
    loadingBar.finish();
  });
}

import { createRouter, createWebHistory, Router, RouteRecordRaw } from 'vue-router';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
import { LAYOUT } from './constant';
import { isArray } from '/@/utils/is';

NProgress.configure({ showSpinner: false });

const modules = import.meta.glob('./modules/**/*.ts');

const routeModuleList: RouteRecordRaw[] = [];

for (const path in modules) {
  await modules[path]().then((mod) => {
    const modDefault = mod.default;
    const modList = isArray(modDefault) ? [...modDefault] : [modDefault];
    routeModuleList.push(...modList);
  });
}

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    component: LAYOUT,
    children: [
      {
        path: '/',
        name: 'home',
        component: () => import('/@/views/home/index.vue'),
      },
    ],
  },
];

// 需要验证权限
export const asyncRoutes = [];

// 普通路由，无需验证权限
export const constantRoutes: RouteRecordRaw[] = [
  {
    path: '/',
    component: LAYOUT,
    children: [
      {
        path: 'home',
        name: 'home',
        component: () => import('/@/views/home/index.vue'),
      },
    ],
  },

  // 登录页
  {
    path: '/login',
    name: 'Login',
    component: () => import('/@/views/login/index.vue'),
    meta: {
      title: '登录',
    },
  },
];

const router: Router = createRouter({
  history: createWebHistory('/'),
  routes: constantRoutes,
});

router.beforeEach(() => {
  if (!NProgress.isStarted()) {
    NProgress.start();
  }
});

router.afterEach(() => {
  NProgress.done();
});

export default router;

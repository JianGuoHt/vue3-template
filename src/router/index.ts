import type { App } from 'vue';
import { createRouter, createWebHistory, Router } from 'vue-router';

import { isArray } from '/@/utils/is';

import { Layout } from './constant';
import { createRouterGuards } from './guards';
import { AppRouteRecordRaw } from './types';

const modules = import.meta.glob('./modules/**/*.ts');

const routeModuleList: AppRouteRecordRaw[] = [];

for (const path in modules) {
  await modules[path]().then((mod: any) => {
    const modDefault = mod.default;
    const modList = isArray(modDefault) ? [...modDefault] : [modDefault];
    routeModuleList.push(...modList);
  });
}

// 需要验证权限
// 动态路由，基于用户权限动态去加载
export const asyncLocalRoutes: AppRouteRecordRaw[] = [...routeModuleList];

// 普通路由，无需验证权限
export const constantRoutes: AppRouteRecordRaw[] = [
  {
    path: '/',
    name: 'Home',
    component: Layout,
    redirect: 'home',
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

export function setupRouter(app: App) {
  app.use(router);
  // 创建路由守卫
  createRouterGuards(router);
}

export default router;

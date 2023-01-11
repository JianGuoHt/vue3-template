import { createRouter, createWebHistory, Router, RouteRecordRaw } from 'vue-router';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
import { LAYOUT } from './constant';

NProgress.configure({ showSpinner: false });

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

const router: Router = createRouter({
  history: createWebHistory('/'),
  routes,
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

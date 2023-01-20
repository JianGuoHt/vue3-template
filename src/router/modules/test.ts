import type { RouteRecordRaw } from 'vue-router';
import { Layout } from '../constant';

const routerName = 'test';

const routes: RouteRecordRaw[] = [
  {
    path: '/test',
    name: routerName,
    component: Layout,
    meta: {
      title: '测试页面',
    },
    children: [
      {
        path: 'index',
        name: routerName + '_index',
        component: () => import('/@/views/test/index.vue'),
      },
    ],
  },
];

export default routes;

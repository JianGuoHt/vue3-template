import { Layout } from '../constant';
import { AppRouteRecordRaw } from '../types';

const routerName = 'test';

const routes: AppRouteRecordRaw[] = [
  {
    path: '/test',
    name: routerName,
    component: Layout,
    permissions: ['*:*:*'],
    children: [
      {
        path: 'index',
        name: routerName + '_index',
        component: () => import('/@/views/test/index.vue'),
        meta: {
          title: '测试页面',
          icon: 'link',
        },
      },
    ],
  },
];

export default routes;

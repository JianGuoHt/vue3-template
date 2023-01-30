import { resultSuccess } from '../_util';

const menuList = () => {
  const result: any[] = [
    {
      name: 'Dashboard',
      path: '/dashboard',
      hidden: false,
      redirect: 'noRedirect',
      component: 'Layout',
      meta: {
        title: 'Dashboard',
        icon: 'DashboardOutlined',
        noCache: false,
        link: null,
      },
      children: [
        {
          path: 'console',
          name: 'dashboard_console',
          component: '/dashboard/console/console',
          hidden: false,
          meta: {
            title: '主控台',
            icon: '',
            noCache: false,
            link: null,
          },
        },
        {
          path: 'monitor',
          name: 'dashboard_monitor',
          component: '/dashboard/monitor/monitor',
          hidden: false,
          meta: {
            title: '监控页',
            icon: '',
            noCache: false,
            link: null,
          },
        },
        {
          path: 'workplace',
          name: 'dashboard_workplace',
          component: '/dashboard/workplace/workplace',
          hidden: true,
          meta: {
            title: '工作台',
            icon: '',
            noCache: false,
            link: null,
          },
        },
      ],
    },

    {
      name: 'Http://ruoyi.vip',
      path: 'http://ruoyi.vip',
      hidden: false,
      component: 'Layout',
      meta: {
        title: '若依官网',
        icon: 'guide',
        noCache: false,
        link: 'http://ruoyi.vip',
      },
    },
  ];

  return result;
};

export default [
  {
    url: '/api/menu/list',
    timeout: 1000,
    method: 'get',
    response: () => {
      const list = menuList();
      return resultSuccess(list);
    },
  },
];

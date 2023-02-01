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
        icon: 'link',
        noCache: false,
        link: null,
      },
      children: [
        {
          path: 'console',
          name: 'dashboard_console',
          component: '/dashboard/console/index',
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
          component: '/dashboard/monitor/index',
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
          component: '/dashboard/workplace/index',
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
      path: '/frame',
      name: 'Frame',
      redirect: '/frame/docs',
      component: 'Layout',
      meta: {
        title: '外部页面',
        sort: 8,
        icon: 'DesktopOutline',
      },
      children: [
        {
          path: 'naive-admin',
          name: 'naive-admin',
          meta: {
            title: 'NaiveAdmin',
            link: 'https://www.naiveadmin.com',
          },
        },
        {
          path: 'docs',
          name: 'frame-docs',
          meta: {
            title: '项目文档(内嵌)',
            link: 'https://jekip.github.io/docs',
          },
        },
        {
          path: 'naive',
          name: 'frame-naive',
          meta: {
            title: 'NaiveUi(内嵌)',
            link: 'https://www.naiveui.com',
          },
        },
      ],
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

/**
 * 生成路由
 */
import type { RouteRecordRaw } from 'vue-router';
import { getMenuList } from '/@/api/system/menu';

interface RouteItem {
  path: string;
  name: string;
  component: string;
  hidden: boolean;
  meta: {
    icon?: string;
    title: string;
    noCache: boolean;
    link?: string;
  };
  children: RouteItem[];
}

/**
 * 动态生成菜单
 */
export function genDynamicRoutes(): Promise<RouteRecordRaw[]> {
  return new Promise((resolve, reject) => {
    getMenuList()
      .then((result) => {
        console.log('==result==', result);
        const routeList = formatRoutes(result.data);
        console.log('==routeList==', routeList);

        asyncImportRoute(routeList);

        resolve(routeList);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

/**
 * 格式化路由数据
 * @param routes
 * @param parent
 */
export function formatRoutes(routes: RouteItem[], parent?: RouteItem): any[] {
  return routes.map((item: RouteItem) => {
    const currentRouter = {
      path: `${(parent && parent.path) || ''}/${item.path}`,
      name: item.name || '',
      component: item.component,
      meta: {
        ...item.meta,
      },
      children: <any>[],
    };

    currentRouter.path = currentRouter.path.replace('//', '/');

    if (item.children && item.children.length) {
      currentRouter.children = formatRoutes(item.children, item);
    }

    return currentRouter;
  });
}

let viewsModules: Record<string, () => Promise<Recordable>>;
export function asyncImportRoute(routes): void {
  viewsModules = viewsModules || import.meta.glob('../views/**/*.{vue,tsx}');
  console.log(viewsModules);
}

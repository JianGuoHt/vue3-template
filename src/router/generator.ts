/**
 * 生成路由
 */
import { asyncLocalRoutes } from '.';
import { isFunction } from '../utils/is';
import { Iframe, Layout, ParentLayout } from './constant';
import { getIcon } from './icons';
import { AppRouteRecordRaw } from './types';
import { getMenuList } from '/@/api/system/menu';
import auth from '/@/plugins/auth';

const LayoutMap = new Map<string, () => Promise<typeof import('*.vue')>>();

LayoutMap.set('Layout', Layout);
LayoutMap.set('Iframe', Iframe);

/**
 * 动态生成菜单
 */
export function genDynamicRoutes(): Promise<AppRouteRecordRaw[]> {
  return new Promise((resolve, reject) => {
    getMenuList()
      .then((result) => {
        const localRoutes = filterAsyncLocalRoutes(asyncLocalRoutes);
        const routeList = formatRoutes(localRoutes.concat(result.data));

        asyncImportRoute(routeList);

        resolve(routeList);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

// 过滤本地动态路由，验证是否具备权限
export function filterAsyncLocalRoutes(routes: AppRouteRecordRaw[]) {
  const resRoutes = routes.filter((item) => {
    return auth.hasPermiOr(item.permissions || []) || auth.hasRoleOr(item.roles || []);
  });

  return resRoutes;
}

/**
 * 格式化路由数据
 * @param routes
 * @param parent
 */
export function formatRoutes(
  routes: AppRouteRecordRaw[],
  parent?: AppRouteRecordRaw,
): AppRouteRecordRaw[] {
  return routes.map((item: AppRouteRecordRaw) => {
    const currentRouter: AppRouteRecordRaw = {
      path: `${(parent && parent.path) || ''}/${item.path}`,
      name: item.name || '',
      component: item.component,
      meta: {
        ...item.meta,
        icon: getIcon(item?.meta?.icon || ''),
      },
      hidden: item.hidden || false,
      children: <AppRouteRecordRaw[]>[],
    };

    currentRouter.path = currentRouter.path.replace('//', '/');

    if (item.children && item.children.length) {
      currentRouter.children = formatRoutes(item.children, item);
    }

    return currentRouter;
  });
}

/**
 * 查找views中对应的组件文件
 * */
let viewsModules: Record<string, () => Promise<Recordable>>;
export function asyncImportRoute(routes: AppRouteRecordRaw[]): void {
  viewsModules = viewsModules || import.meta.glob('../views/**/*.{vue,tsx}');

  if (!routes) return;

  routes.forEach((item) => {
    if (!item.component && item.meta?.link) {
      item.component = 'Iframe';
    }

    const { component, name, children } = item;
    if (component) {
      const layoutFound = LayoutMap.get(component);

      if (layoutFound) {
        item.component = layoutFound;
      } else if (!isFunction(component)) {
        item.component = dynamicImport(viewsModules, component);
      }
    } else if (name) {
      item.component = ParentLayout;
    }

    children && asyncImportRoute(children);
  });
}

/**
 * 动态导入
 * */
export const dynamicImport = (
  viewsModules: Record<string, () => Promise<Recordable>>,
  component: string,
) => {
  const keys = Object.keys(viewsModules);
  const matchKeys = keys.filter((key) => {
    let k = key.replace('../views', '');
    const lastIndex = k.lastIndexOf('.');
    k = k.substring(0, lastIndex);
    return k === component;
  });
  if (matchKeys?.length === 1) {
    const matchKey = matchKeys[0];
    return viewsModules[matchKey];
  }
  if (matchKeys?.length > 1) {
    console.warn(
      'Please do not create `.vue` and `.TSX` files with the same file name in the same hierarchical directory under the views folder. This will cause dynamic introduction failure',
    );
    return;
  }
};

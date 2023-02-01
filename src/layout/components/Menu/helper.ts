import { AppRouteRecordRaw } from '/@/router/types';
import type { MenuOption } from 'naive-ui';
import { PageEnum } from '/@/enums/pageEnum';
import { renderIcon, renderNIcon } from '/@/utils';

/**
 * 排除Router
 * */
export function filterRouter(routerMap: AppRouteRecordRaw[]) {
  return routerMap.filter((item) => {
    return (
      (item.hidden || false) != true &&
      !['/:path(.*)*', '/', PageEnum.REDIRECT, PageEnum.BASE_LOGIN].includes(item.path)
    );
  });
}

/**
 * 判断根路由 Router
 * */
export function isRootRouter(routeItem: AppRouteRecordRaw) {
  return (
    routeItem.alwaysShow != true && routeItem.children?.filter((item) => !item.hidden)?.length === 1
  );
}

/**
 * 递归组装菜单
 */
export function generateMenu(routeMap: AppRouteRecordRaw[]) {
  return filterRouter(routeMap).map((item) => {
    const isRoot = isRootRouter(item);
    const info = isRoot && item.children ? item.children[0] : item;

    const currentMenu: MenuOption = {
      key: info.name,
      label: info.meta?.title,
      icon: info.meta?.icon ? renderNIcon(renderIcon(info.meta?.icon)) : undefined,
    };
    // 是否有子菜单，并递归处理
    if (info.children && info.children.length > 0) {
      // Recursion
      currentMenu.children = generateMenu(info.children);
    }
    return currentMenu;
  });
}

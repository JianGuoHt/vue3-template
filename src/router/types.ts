import type { ExtendedIconifyIcon } from '@iconify/types';
import type { RouteMeta, RouteRecordRaw } from 'vue-router';

// 后端返回的菜单结构
export interface AsyncRouteRecordRaw {
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
  children: AsyncRouteRecordRaw[];
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unnecessary-type-constraint
export type Component<T extends any = any> =
  | ReturnType<typeof defineComponent>
  | (() => Promise<typeof import('*.vue')>)
  | (() => Promise<T>);

export type AppRouteRecordRaw = {
  name: string;
  hidden?: boolean;
  alwaysShow?: boolean;
  permissions?: string[];
  roles?: string[];
  component?: Component | string;
  components?: Component;
  children?: AppRouteRecordRaw[];
  props?: Recordable;
  fullPath?: string;
  meta?: {
    icon?: ExtendedIconifyIcon | string;
    title?: string;
    noCache?: boolean;
    link?: string;
  } & RouteMeta;
} & RouteRecordRaw;

import { constantRoutes } from '/@/router';
import { genDynamicRoutes } from '/@/router/generator';
import { AppRouteRecordRaw } from '/@/router/types';
import store from '/@/store';

export interface AsyncRouteState {
  routes: AppRouteRecordRaw[];
  addRoutes: AppRouteRecordRaw[];
  menus: AppRouteRecordRaw[];
  isDynamicAddRoute: boolean;
}

export const useAsyncRouteStore = defineStore('app-async-route', {
  state: (): AsyncRouteState => ({
    routes: [],
    addRoutes: [],
    menus: [],
    // 是否已添加动态路由
    isDynamicAddRoute: false,
  }),

  getters: {
    getIsDynamicAddRoute(): boolean {
      return this.isDynamicAddRoute;
    },

    getMenus(): AppRouteRecordRaw[] {
      return this.menus;
    },
  },

  actions: {
    setDynamicAddRoute(added: boolean) {
      this.isDynamicAddRoute = added;
    },

    setRoutes(routes: AppRouteRecordRaw[]) {
      this.addRoutes = routes;
      this.routes = constantRoutes.concat(routes);
    },

    setMenus(routes: AppRouteRecordRaw[]) {
      this.menus = routes;
    },

    async getRoutes() {
      // 动态获取菜单
      const accessedRoutes = await genDynamicRoutes();

      this.setRoutes(accessedRoutes);
      this.setMenus(this.routes);

      console.log('==routes==', this.routes);

      return toRaw(accessedRoutes);
    },
  },
});

// Need to be used outside the setup
export function useAsyncRouteStoreWidthOut() {
  return useAsyncRouteStore(store);
}

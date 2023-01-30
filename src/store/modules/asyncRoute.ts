import { getMenuList } from '/@/api/system/menu';
import { constantRoutes } from '/@/router';
import { genDynamicRoutes } from '/@/router/generator';
import store from '/@/store';

export interface AsyncRouteState {
  routes: any[];
  addRoutes: any[];
  isDynamicAddRoute: boolean;
}

export const useAsyncRouteStore = defineStore('app-async-route', {
  state: (): AsyncRouteState => ({
    routes: [],
    addRoutes: [],
    // 是否已添加动态路由
    isDynamicAddRoute: false,
  }),

  getters: {
    getIsDynamicAddRoute(): boolean {
      return this.isDynamicAddRoute;
    },
  },

  actions: {
    setDynamicAddRoute(added: boolean) {
      this.isDynamicAddRoute = added;
    },

    setRoutes(routes: []) {
      this.addRoutes = routes;
      this.routes = constantRoutes.concat(routes);
    },

    async getRoutes() {
      let accessedRoutes;
      try {
        // 动态获取菜单
        await genDynamicRoutes();
      } catch (error) {
        console.log(error);
      }
    },
  },
});

// Need to be used outside the setup
export function useAsyncRouteStoreWidthOut() {
  return useAsyncRouteStore(store);
}

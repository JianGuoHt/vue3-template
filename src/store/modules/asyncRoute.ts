import { constantRoutes } from '/@/router';

export interface AsyncRouteState {
  routes: any[];
  addRoutes: any[];
}

export const useAsyncRouteStore = defineStore('app-async-route', {
  state: (): AsyncRouteState => ({
    routes: [],
    addRoutes: [],
  }),

  actions: {
    setRoutes(routes: []) {
      this.addRoutes = routes;
      this.routes = constantRoutes.concat(routes);
    },
  },
});

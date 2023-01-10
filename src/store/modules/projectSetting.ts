export const useProjectSettingStore = defineStore('app-project-setting', {
  state: () => ({
    menuCollapse: false,
  }),

  getters: {},

  actions: {
    setMenuCollapse(value: boolean): void {
      this.menuCollapse = value;
    },
  },
});

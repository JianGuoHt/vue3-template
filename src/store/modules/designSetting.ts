import store from '/@/store';
import { storage } from '/@/utils/Storage';
import designSetting, { appThemeList } from '/@/settings/designSetting';
import { StorageEnum } from '/@/enums/storageEnum';

const { darkTheme, appTheme } = designSetting;

interface DesignSettingState {
  //深色主题(黑暗模式)
  darkTheme: boolean;

  // 系统主题色
  appTheme: string;

  // 系统内置主题色
  appThemeList: string[];
}

// 获取用户设置的主题色
const appThemeStorage = storage.get(StorageEnum.APP_THEME);

// 获取用户设置的主题
const darkThemeStorage = storage.get(StorageEnum.DARK_THEME);

export const useDesignSettingStore = defineStore('app-design-setting', {
  state: (): DesignSettingState => ({
    darkTheme: darkThemeStorage || darkTheme,
    appTheme: appThemeStorage || appTheme,
    appThemeList,
  }),

  actions: {
    setDarkTheme(val: boolean) {
      this.darkTheme = val;
      storage.set(StorageEnum.DARK_THEME, val);
    },

    setAppTheme(color: string) {
      this.appTheme = color;
      storage.set(StorageEnum.APP_THEME, color);
    },
  },
});

// Need to be used outside the setup
export function useDesignSettingWithOut() {
  return useDesignSettingStore(store);
}

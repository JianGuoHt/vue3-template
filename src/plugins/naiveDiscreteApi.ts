import { createDiscreteApi, darkTheme } from 'naive-ui';

import { useDesignSettingWithOut } from '/@/store/modules/designSetting';
import { lighten } from '/@/utils';

/**
 * 挂载 Naive-ui 脱离上下文的 API
 * 如果你想在 setup 外使用 useDialog、useMessage、useNotification、useLoadingBar，可以通过 createDiscreteApi 来构建对应的 API。
 * https://www.naiveui.com/zh-CN/light/components/discrete
 */

export function setupNaiveDiscreteApi() {
  const designStore = useDesignSettingWithOut();

  const { dialog, message, loadingBar, notification } = createDiscreteApi(
    ['dialog', 'loadingBar', 'message', 'notification'],
    {
      configProviderProps: {
        theme: designStore.darkTheme ? darkTheme : undefined,
        themeOverrides: {
          common: {
            primaryColor: designStore.appTheme,
            primaryColorHover: lighten(designStore.appTheme, 6),
            primaryColorPressed: lighten(designStore.appTheme, 6),
          },
          LoadingBar: {
            colorLoading: designStore.appTheme,
          },
        },
      },
    },
  );

  window['$dialog'] = dialog;
  window['$loadingBar'] = loadingBar;
  window['$message'] = message;
  window['$notification'] = notification;
}

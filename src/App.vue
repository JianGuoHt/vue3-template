<template>
  <NConfigProvider
    :locale="zhCN"
    :date-locale="dateZhCN"
    :theme="getTheme"
    :theme-overrides="getThemeOverrides"
  >
    <AppProvider>
      <RouterView />
    </AppProvider>
  </NConfigProvider>
</template>

<script setup lang="ts">
import type { GlobalThemeOverrides } from 'naive-ui';
import { darkTheme, dateZhCN, zhCN } from 'naive-ui';

import { AppProvider } from '/@/components/Application';
import { useDesignSettingStore } from '/@/store/modules/designSetting';

import { lighten } from './utils';

const designSettingStore = useDesignSettingStore();

// 控制是否黑夜模式
const getTheme = computed(() => (designSettingStore.darkTheme ? darkTheme : undefined));

// 配置naive-ui主题
const getThemeOverrides = computed(() => {
  const appTheme = designSettingStore.appTheme;
  // 主题色浅色
  const lightenStr = lighten(appTheme, 6);

  const theme: GlobalThemeOverrides = {
    common: {
      primaryColor: appTheme,
      primaryColorHover: lightenStr,
      primaryColorPressed: lightenStr,
      primaryColorSuppl: appTheme,
    },
    LoadingBar: {
      colorLoading: appTheme,
    },
  };

  return theme;
});
</script>

<style scoped></style>

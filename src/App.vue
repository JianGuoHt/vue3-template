<template>
  <NConfigProvider
    :locale="zhCN"
    :date-locale="dateZhCN"
    :theme="getTheme"
    :theme-overrides="getThemeOverrides"
  >
    <RouterView />
  </NConfigProvider>
</template>

<script setup lang="ts">
import type { GlobalThemeOverrides } from 'naive-ui';
import { zhCN, dateZhCN, darkTheme } from 'naive-ui';
import { useDesignSettingStore } from '/@/store/modules/designSetting';

const designSetting = useDesignSettingStore();

// 控制是否黑夜模式
const getTheme = computed(() => (designSetting.darkTheme ? darkTheme : undefined));

// 配置naive-ui主题
const getThemeOverrides = computed(() => {
  const appTheme = designSetting.appTheme;
  const theme: GlobalThemeOverrides = {
    common: {
      primaryColor: appTheme,
    },
  };

  return theme;
});
</script>

<style scoped></style>

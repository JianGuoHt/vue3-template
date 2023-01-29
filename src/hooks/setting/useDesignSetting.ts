import { useDesignSettingStore } from '/@/store/modules/designSetting';

export function useDesignSetting() {
  const designStore = useDesignSettingStore();

  const getDarkTheme = computed(() => designStore.darkTheme);

  return { getDarkTheme };
}

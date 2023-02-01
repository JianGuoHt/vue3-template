<template>
  <div class="layout__menu overflow-hidden">
    <n-menu
      :value="getSelectedMenuKey"
      :collapsed="menuCollapse"
      :options="menuOptions"
      :inverted="inverted"
      :indent="24"
      :collapsed-icon-size="20"
      :collapsed-width="64"
      @update:value="onClickMenu"
    />
  </div>
</template>

<script lang="ts">
export default defineComponent({
  name: 'LayoutMenu',
});
</script>

<script lang="ts" setup>
import type { MenuOption } from 'naive-ui';
import { useProjectSettingStore } from '/@/store/modules/projectSetting';
import { useDesignSettingStore } from '/@/store/modules/designSetting';
import { useAsyncRouteStore } from '/@/store/modules/asyncRoute';
import { generateMenu } from './helper';
import { useRoute, useRouter } from 'vue-router';

const projectSettingStore = useProjectSettingStore();
const asyncRouteStore = useAsyncRouteStore();
const design = useDesignSettingStore();
const currentRoute = useRoute();
const router = useRouter();

const { menuCollapse } = storeToRefs(projectSettingStore);

// 菜单颜色是否反转
const inverted = computed(() => !design.darkTheme);

const menuOptions: MenuOption[] = generateMenu(asyncRouteStore.getMenus);

// 获取默认选中菜单
const getSelectedMenuKey = computed(() => {
  return currentRoute.name as string;
});

// 切换菜单
function onClickMenu(key: string) {
  router.push({ name: key });
}

console.log(menuOptions);
</script>

<style lang="scss" scoped>
.layout__menu {
  height: calc(100% - 50px);
}
</style>

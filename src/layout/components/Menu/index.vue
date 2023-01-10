<template>
  <div class="layout__menu overflow-hidden">
    <ElScrollbar height="100%">
      <ElMenu default-active="2" v-bind="menuOptions">
        <ElMenuItem v-for="item in 20" :key="item" :index="item + ''">
          <div class="menu__content">
            <ElIcon>
              <Icon icon="ep:apple" />
            </ElIcon>
          </div>
          <template #title>
            <div class="menu__content">菜单{{ item }}</div>
          </template>
        </ElMenuItem>
      </ElMenu>
    </ElScrollbar>
  </div>
</template>

<script lang="ts">
export default defineComponent({
  name: 'LayoutMenu',
});
</script>

<script lang="ts" setup>
import { Icon } from '@iconify/vue';
import { useProjectSettingStore } from '@/store/modules/projectSetting';

const projectSettingStore = useProjectSettingStore();

const { menuCollapse } = storeToRefs(projectSettingStore);

const menuOptions = reactive({
  backgroundColor: 'rgb(0, 20, 40)',
  textColor: '#bbbbbb',
  activeTextColor: '#ffffff',
  collapse: menuCollapse,
});
</script>

<style lang="scss" scoped>
.layout__menu {
  --el-menu-item-height: 42px;
  height: calc(100% - 50px);
  :deep(.el-menu) {
    border-right: none;
  }

  :deep(.el-menu-item) {
    margin-top: 6px;
    &.is-active::after {
      background-color: var(--el-color-primary);
    }
    &::after {
      z-index: 1;
      display: block;
      content: ' ';
      position: absolute;
      top: 0;
      bottom: 0;
      left: 8px;
      right: 8px;
      pointer-events: none;
      background-color: rgba(0, 0, 0, 0);
      border-radius: 4px;
      transition: background-color 0.3s;
    }

    .menu__content {
      position: relative;
      z-index: 2;
    }
  }
}
</style>

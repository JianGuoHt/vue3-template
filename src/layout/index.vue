<template>
  <NLayout class="layout" position="absolute" has-sider>
    <NLayoutSider
      class="layout__aside"
      :width="menuCollapse ? '64px' : '200px'"
      :inverted="true"
      :collapsed-width="64"
    >
      <LayoutLogo />
      <LayoutMenu />
    </NLayoutSider>

    <NLayout>
      <NLayoutHeader position="absolute">
        <LayoutHeader />
      </NLayoutHeader>

      <NLayoutContent :class="{ layout__default_background: getDarkTheme === false }">
        <div class="layout__main">
          <div class="layout__main__body">
            <LayoutMain />
          </div>
        </div>
      </NLayoutContent>
    </NLayout>
  </NLayout>
</template>

<script lang="ts">
export default defineComponent({
  name: 'DefaultLayout',
});
</script>

<script lang="ts" setup>
import { useDesignSetting } from '/@/hooks/setting/useDesignSetting';
import { useProjectSettingStore } from '/@/store/modules/projectSetting';

import LayoutHeader from './components/Header/index.vue';
import LayoutLogo from './components/Logo/index.vue';
import LayoutMain from './components/Main/index.vue';
import LayoutMenu from './components/Menu/index.vue';

const projectSettingStore = useProjectSettingStore();

const { getDarkTheme } = useDesignSetting();

const { menuCollapse } = storeToRefs(projectSettingStore);
</script>

<style lang="scss" scoped>
.layout {
  height: 100%;

  .layout__aside {
    // background-color: rgb(0, 20, 40);
    transition: all 0.2s ease-in-out;
  }

  .n-layout-header.n-layout-header--absolute-positioned {
    z-index: 11;
  }

  &__default_background {
    background: #f5f7f9;
  }

  .layout__main {
    height: 100vh;
    padding-top: 54px;
    margin: 0 10px 0 10px;
  }
}
</style>

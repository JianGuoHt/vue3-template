<template>
  <ElContainer class="layout__default">
    <ElAside class="layout__aside" :width="menuCollapse ? '64px' : '200px'">
      <LayoutLogo />
      <LayoutMenu />
    </ElAside>
    <ElContainer style="flex-direction: column">
      <LayoutHeader />
      <LayoutMain />
    </ElContainer>
  </ElContainer>
</template>

<script lang="ts">
export default defineComponent({
  name: 'DefaultLayout',
});
</script>

<script lang="ts" setup>
import LayoutMain from './components/Main/index.vue';
import LayoutHeader from './components/Header/index.vue';
import LayoutMenu from './components/Menu/index.vue';
import LayoutLogo from './components/Logo/index.vue';
import { useProjectSettingStore } from '/@/store/modules/projectSetting';

const projectSettingStore = useProjectSettingStore();

const { menuCollapse } = storeToRefs(projectSettingStore);
</script>

<style lang="scss" scoped>
.layout__default {
  height: 100%;
}

.layout__aside {
  background-color: rgb(0, 20, 40);
  transition: all 0.2s ease-in-out;
}
</style>

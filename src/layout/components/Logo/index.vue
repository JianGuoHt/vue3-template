<template>
  <div class="layout__logo flex items-center justify-center overflow-hidden">
    <img :class="[menuCollapse ? '' : 'mr-2']" :src="Logo" alt="" />
    <h2 v-if="!menuCollapse" class="logo__title">vue3Template</h2>
  </div>
</template>

<script lang="ts">
export default defineComponent({
  name: 'LayoutLogo',
});
</script>

<script lang="ts" setup>
import { useProjectSettingStore } from '/@/store/modules/projectSetting';
import Logo from '/@/assets/images/logo/logo.png';

const projectSettingStore = useProjectSettingStore();
const { menuCollapse } = storeToRefs(projectSettingStore);
</script>

<style lang="scss" scoped>
.layout__logo {
  height: 50px;
  line-height: 50px;
  white-space: nowrap;

  img {
    width: auto;
    height: 32px;
    border-radius: 2px;
  }

  .logo__title {
    margin: 0;
    font-weight: 700;
    font-size: 20px;
    color: #fff;
  }
}
</style>

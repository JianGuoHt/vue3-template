<template>
  <ElHeader class="layout__header bg-white shadow" style="--el-header-height: 50px">
    <div class="layout__header__left flex">
      <MenuTrigger />
    </div>
  </ElHeader>
</template>

<script lang="ts">
export default defineComponent({
  name: 'LayoutHeader',
});
</script>

<script lang="ts" setup>
import MenuTrigger from './MenuTrigger.vue';
</script>

<style lang="scss" scoped>
.layout__header {
  .layout__header__left {
    height: inherit;
  }
}
</style>

<template>
  <div class="layout__header bg-white shadow">
    <div class="layout__header__left flex">
      <MenuTrigger />
    </div>
  </div>
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
  height: 50px;
  .layout__header__left {
    height: inherit;
  }
}
</style>

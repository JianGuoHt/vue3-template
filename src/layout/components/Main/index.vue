<template>
  <RouterView>
    <template #default="{ Component, route }">
      <KeepAlive>
        <component :is="Component" :key="route.fullPath" />
      </KeepAlive>
    </template>
  </RouterView>
</template>

<script lang="ts">
export default defineComponent({
  name: 'LayoutMain',
});
</script>

<style lang="scss" scoped>
.layout__app__main {
}
</style>

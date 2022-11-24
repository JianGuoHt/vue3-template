<script setup lang="ts">
import zhCn from 'element-plus/lib/locale/lang/zh-cn';
</script>

<template>
  <ElConfigProvider :locale="zhCn">
    <RouterView />
  </ElConfigProvider>
</template>

<style scoped></style>

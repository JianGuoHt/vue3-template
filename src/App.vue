<script setup lang="ts">
import { zhCN, dateZhCN } from 'naive-ui';
</script>

<template>
  <NConfigProvider :locale="zhCN" :date-locale="dateZhCN">
    <RouterView />
  </NConfigProvider>
</template>

<style scoped></style>

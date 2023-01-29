<template>
  <NDialogProvider>
    <NNotificationProvider>
      <NMessageProvider>
        <NLoadingBarProvider>
          <slot name="default"></slot>
        </NLoadingBarProvider>
      </NMessageProvider>
    </NNotificationProvider>
  </NDialogProvider>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'Application',
});
</script>

<script lang="ts" setup></script>

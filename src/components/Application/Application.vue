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
export default defineComponent({
  name: 'Application',
});
</script>

<script lang="ts" setup></script>

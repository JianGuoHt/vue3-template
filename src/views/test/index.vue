<template>
  <div>测试页面1 <Icon :icon="getIcon('aim')" /></div>
</template>

<script lang="ts">
export default defineComponent({
  name: 'TestPage',
});
</script>

<script lang="ts" setup>
import { Icon } from '@iconify/vue';
import { getIcon } from '/@/router/icons';
</script>

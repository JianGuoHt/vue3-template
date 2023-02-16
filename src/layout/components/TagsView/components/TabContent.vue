<template>
  <NDropdown trigger="click" :options="dropdownOptions">
    <button class="suffix__btn">
      <Icon class="inline" icon="ep:arrow-down" />
    </button>
  </NDropdown>
</template>

<script lang="ts">
export default defineComponent({
  name: 'TabContent',
});
</script>

<script lang="ts" setup>
import { Icon } from '@iconify/vue';

import { renderIcon } from '/@/utils';

const dropdownOptions = reactive([
  {
    label: '关闭标签',
    key: 'closeTab',
    icon: renderIcon('ep:close-bold'),
  },
  {
    type: 'divider',
  },
  {
    label: '关闭左侧标签',
    key: 'closeLeftTab',
    icon: renderIcon('line-md:arrow-close-left'),
  },
  {
    label: '关闭右侧标签',
    key: 'closeRightTab',
    icon: renderIcon('line-md:arrow-close-right'),
  },
  {
    type: 'divider',
  },
  {
    label: '关闭其它标签页',
    key: 'closeOtherTab',
    icon: renderIcon('dashicons:align-center'),
  },
  {
    label: '关闭全部标签页',
    key: 'closeAllTab',
    icon: renderIcon('clarity:minus-line'),
  },
]);
</script>

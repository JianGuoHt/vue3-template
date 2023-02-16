<template>
  <div class="layout__tags_view shadow-md">
    <NTabs
      v-model:value="selTab"
      class="tag__body"
      type="card"
      closable
      :tabs-padding="6"
      :tab-style="{
        height: '26px',
        borderRadius: '2px',
        border: '1px solid #d9d9d9',
        backgroundColor: '#fff',
      }"
    >
      <NTab v-for="i in 10" :key="i" :name="i"></NTab>

      <template #suffix>
        <TabRefresh />
        <TabContent />
      </template>
    </NTabs>
  </div>
</template>

<script lang="ts">
export default defineComponent({
  name: 'LayoutTagsView',
});
</script>

<script lang="ts" setup>
import { Icon } from '@iconify/vue';

import { useDesignSettingStore } from '/@/store/modules/designSetting';

import TabContent from './components/TabContent.vue';
import TabRefresh from './components/TabRefresh.vue';

const selTab = ref('');

const designSettingStore = useDesignSettingStore();

const { appTheme } = storeToRefs(designSettingStore);
</script>

<style lang="scss" scoped>
@import './index.scss';
</style>

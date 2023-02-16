<template>
  <div class="layout__tags_view shadow-md">
    <div class="tags__body flex">
      <div class="tag__list flex-auto overflow-hidden whitespace-nowrap">
        <div class="tag__list__body flex" :style="{ transform: 'translate(-100px, 0px)' }">
          <div
            v-for="item in 20"
            :key="item"
            class="tag__item mr-2 flex flex-auto cursor-pointer bg-white"
          >
            <span>测试测试{{ item }}</span>
            <button class="w-4 items-start bg-transparent hover:text-[16px]">
              <Icon class="inline pl-1" icon="ep:close" />
            </button>
          </div>
        </div>
      </div>
      <div class="tag__utils flex flex-none items-stretch">
        <button class="bg-transparent">
          <Icon class="inline" icon="ep:refresh" />
        </button>
        <button class="bg-transparent">
          <Icon class="inline" icon="ep:arrow-down" />
        </button>
      </div>
    </div>
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

const designSettingStore = useDesignSettingStore();

const { appTheme } = storeToRefs(designSettingStore);
</script>

<style lang="scss" scoped>
.layout__tags_view {
  font-size: 12px;
  height: var(--sys-tags-view-height);
  // line-height: var(--sys-tags-view-height);
  background-color: #fff;
  border-bottom: 1px solid #ccc;

  .tags__body {
    padding-top: 3px;
    height: 30px;
  }

  .tag__list__body {
    padding: 0 6px;
    transition: all 0.3s;
    .tag__item {
      height: 26px;
      line-height: 26px;
      padding: 0 10px;
      border: 1px solid #d9d9d9;
      border-radius: 2px;
      &:hover {
        color: v-bind(appTheme);
      }

      &.is__active {
        background-color: v-bind(appTheme);
        color: #fff;
        border: none;
      }
    }
  }

  .tag__utils {
    padding-left: 6px;
    > button {
      width: 36px;
      text-align: center;
      border-left: 1px solid #d9d9d9;
      font-size: 14px;
      color: rgba(0, 0, 0, 0.45);

      &:hover {
        color: #000;
      }
    }
  }
}
</style>

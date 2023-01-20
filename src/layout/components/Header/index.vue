<template>
  <div class="layout__header flex justify-between shadow">
    <div class="layout__header__left flex">
      <MenuTrigger />
    </div>

    <div class="layout__header__right flex">
      <div class="layout__header__trigger" @click="onOpenSetting">
        <NIcon size="18">
          <Icon icon="ep:setting" />
        </NIcon>
      </div>
    </div>

    <ProjectSetting ref="projectSettingRef" />
  </div>
</template>

<script lang="ts">
export default defineComponent({
  name: 'LayoutHeader',
});
</script>

<script lang="ts" setup>
import { Icon } from '@iconify/vue';
import MenuTrigger from './MenuTrigger.vue';
import ProjectSetting from './ProjectSetting.vue';

const projectSettingRef = ref<InstanceType<typeof ProjectSetting> | null>();

// 打开设置
function onOpenSetting() {
  projectSettingRef.value?.open();
}
</script>

<style lang="scss" scoped>
.layout__header {
  height: 50px;
  .layout__header__left {
    height: inherit;
  }

  .layout__header__right {
    height: inherit;
  }

  .layout__header__trigger {
    height: 50px;
    line-height: 50px;
    cursor: pointer;
    padding: 0 10px;

    .n-icon {
      height: 100%;
      display: flex;
      align-items: center;
    }
  }
}
</style>

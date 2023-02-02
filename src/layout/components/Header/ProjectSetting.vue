<template>
  <NDrawer v-model:show="drawerShow">
    <NDrawerContent title="项目配置">
      <div class="drawer__content">
        <!-- 主题 -->
        <NDivider title-placement="center">主题</NDivider>
        <div class="drawer__setting_item flex justify-center">
          <NTooltip placement="bottom">
            <template #trigger>
              <!-- v-model:value="designStore.darkTheme" -->
              <NSwitch
                :value="designStore.darkTheme"
                :rail-style="setRailStyle"
                @update:value="onChangeDarkTheme"
              >
                <template #checked>
                  <NIcon size="14" color="#ffd93b">
                    <Icon icon="material-symbols:sunny" />
                  </NIcon>
                </template>
                <template #unchecked>
                  <NIcon size="14" color="#ffd93b">
                    <Icon icon="ri:moon-clear-fill" />
                  </NIcon>
                </template>
              </NSwitch>
            </template>
            <span>深色主题</span>
          </NTooltip>
        </div>

        <NDivider title-placement="center">系统主题</NDivider>
        <div class="drawer__setting_item flex items-center justify-center">
          <div
            v-for="(item, index) in designStore.appThemeList"
            :key="index"
            class="theme__item m-1 flex cursor-pointer items-center justify-center"
            :style="{ background: item }"
            @click="onChangeAppTheme(item)"
          >
            <NIcon v-if="item === designStore.appTheme" size="18" color="#fff">
              <Icon icon="material-symbols:check-small-rounded" />
            </NIcon>
          </div>
        </div>
      </div>
    </NDrawerContent>
  </NDrawer>
</template>

<script lang="ts" setup>
import { Icon } from '@iconify/vue';
import type { CSSProperties } from 'vue';

import { useDesignSettingStore } from '/@/store/modules/designSetting';

const drawerShow = ref(false);

const designStore = useDesignSettingStore();

function setRailStyle({ focused, checked }: { focused: boolean; checked: boolean }) {
  const style: CSSProperties = {};

  style.background = '#000e1c';
  return style;
}

// 打开设置
function open() {
  drawerShow.value = true;
}

//切换深色模式
function onChangeDarkTheme(val: boolean) {
  designStore.setDarkTheme(val);
}

//切换系统主题色
function onChangeAppTheme(color: string) {
  designStore.setAppTheme(color);
}

defineExpose({
  open,
});
</script>

<style lang="scss" scoped>
.drawer__content {
  .n-divider {
    margin: 10px 0;
  }

  .theme__item {
    width: 22px;
    height: 22px;
  }
}
</style>

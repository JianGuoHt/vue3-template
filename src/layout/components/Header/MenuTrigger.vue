<template>
  <div class="menu__trigger" @click="onChangeCollapse">
    <ElIcon v-if="menuCollapse" size="18">
      <Icon icon="ep:expand" />
    </ElIcon>
    <ElIcon v-else size="18">
      <Icon icon="ep:fold" />
    </ElIcon>
  </div>
</template>

<script lang="ts">
export default defineComponent({
  name: 'MenuTrigger',
});
</script>

<script lang="ts" setup>
import { Icon } from '@iconify/vue';
import { useProjectSettingStore } from '@/store/modules/projectSetting';

const projectSettingStore = useProjectSettingStore();

const { menuCollapse } = storeToRefs(projectSettingStore);

const { setMenuCollapse } = projectSettingStore;

function onChangeCollapse() {
  setMenuCollapse(!menuCollapse.value);
}
</script>

<style lang="scss" scoped>
.menu__trigger {
  line-height: var(--el-header-height);
  cursor: pointer;
}
</style>

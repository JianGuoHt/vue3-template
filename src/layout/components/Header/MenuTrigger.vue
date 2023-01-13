<template>
  <div class="menu__trigger" @click="onChangeCollapse">
    <NIcon v-if="menuCollapse" size="18">
      <Icon icon="ep:expand" />
    </NIcon>
    <NIcon v-else size="18">
      <Icon icon="ep:fold" />
    </NIcon>
  </div>
</template>

<script lang="ts">
export default defineComponent({
  name: 'MenuTrigger',
});
</script>

<script lang="ts" setup>
import { Icon } from '@iconify/vue';
import { useProjectSettingStore } from '/@/store/modules/projectSetting';

const projectSettingStore = useProjectSettingStore();

const { menuCollapse } = storeToRefs(projectSettingStore);

const { setMenuCollapse } = projectSettingStore;

function onChangeCollapse() {
  setMenuCollapse(!menuCollapse.value);
}
</script>

<style lang="scss" scoped>
.menu__trigger {
  line-height: 50px;
  cursor: pointer;
}
</style>

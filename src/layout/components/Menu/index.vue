<template>
  <div class="layout__menu overflow-hidden">
    <n-menu
      :collapsed="menuCollapse"
      :options="menuOptions"
      :inverted="inverted"
      :indent="24"
      :collapsed-icon-size="20"
      :collapsed-width="64"
    />
  </div>
</template>

<script lang="ts">
export default defineComponent({
  name: 'LayoutMenu',
});
</script>

<script lang="ts" setup>
import type { MenuOption } from 'naive-ui';
import { Icon } from '@iconify/vue';
import { NIcon } from 'naive-ui';
import { useProjectSettingStore } from '/@/store/modules/projectSetting';
import { useDesignSettingStore } from '/@/store/modules/designSetting';

const projectSettingStore = useProjectSettingStore();

const { menuCollapse } = storeToRefs(projectSettingStore);

const design = useDesignSettingStore();
// 菜单颜色是否反转
const inverted = computed(() => !design.darkTheme);

function renderIcon() {
  return () => h(NIcon, null, { default: () => h(Icon, { icon: 'ep:apple' }) });
}

const menuOptions: MenuOption[] = [
  {
    label: '且听风吟',
    key: 'hear-the-wind-sing',
    icon: renderIcon(),
  },
  {
    label: '1973年的弹珠玩具',
    key: 'pinball-1973',
    icon: renderIcon(),
    disabled: true,
    children: [
      {
        label: '鼠',
        key: 'rat',
      },
    ],
  },
  {
    label: '寻羊冒险记',
    key: 'a-wild-sheep-chase',
    disabled: true,
    icon: renderIcon(),
  },
  {
    label: '舞，舞，舞',
    key: 'dance-dance-dance',
    icon: renderIcon(),
    children: [
      {
        type: 'group',
        label: '人物',
        key: 'people',
        children: [
          {
            label: '叙事者',
            key: 'narrator',
            icon: renderIcon(),
          },
          {
            label: '羊男',
            key: 'sheep-man',
            icon: renderIcon(),
          },
        ],
      },
      {
        label: '饮品',
        key: 'beverage',
        icon: renderIcon(),
        children: [
          {
            label: '威士忌',
            key: 'whisky',
          },
        ],
      },
      {
        label: '食物',
        key: 'food',
        children: [
          {
            label: '三明治',
            key: 'sandwich',
          },
        ],
      },
      {
        label: '过去增多，未来减少',
        key: 'the-past-increases-the-future-recedes',
      },
    ],
  },
];
</script>

<style lang="scss" scoped>
.layout__menu {
  height: calc(100% - 50px);
}
</style>

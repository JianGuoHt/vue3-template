import vue from '@vitejs/plugin-vue';
import AutoImport from 'unplugin-auto-import/vite';
import { FileSystemIconLoader } from 'unplugin-icons/loaders';
import IconsResolver from 'unplugin-icons/resolver';
import Icons from 'unplugin-icons/vite';
import { NaiveUiResolver } from 'unplugin-vue-components/resolvers';
import Components from 'unplugin-vue-components/vite';
import { PluginOption } from 'vite';

import { configMockPlugin } from './mock';

export default ({ isBuild, viteEnv }: ViteConfigEnv) => {
  const { VITE_USE_MOCK, VITE_GLOB_PROD_MOCK } = viteEnv;
  const prodMock = VITE_GLOB_PROD_MOCK;
  const vitePlugins: PluginOption[] = [
    vue(),
    Icons({
      compiler: 'vue3',
      // autoInstall: true,

      customCollections: {
        alias: {
          park: 'icon-park',
        },
        custom: FileSystemIconLoader('src/assets/icons'),
      },
    }),
    AutoImport({
      imports: [
        'vue',
        'pinia',
        {
          'naive-ui': ['useDialog', 'useMessage', 'useNotification', 'useLoadingBar'],
        },
      ],
      resolvers: [],
      dts: './auto-import.d.ts', // 生成在src路径下名为auto-import.d.ts的声明文件
      eslintrc: {
        enabled: true, // Default `false`
        filepath: './.eslintrc-auto-import.json', // Default `./.eslintrc-auto-import.json`
        globalsPropValue: true, // Default `true`, (true | false | 'readonly' | 'readable' | 'writable' | 'writeable')
      },
    }),
    Components({
      dts: './components.d.ts',
      // imports 指定组件所在位置，默认为 src/components; 有需要也可以加上 view 目录
      dirs: ['src/components/'],
      resolvers: [
        NaiveUiResolver(),
        IconsResolver({
          customCollections: ['custom'],
        }),
      ],
    }),
  ];

  // vite-plugin-mock
  VITE_USE_MOCK && vitePlugins.push(configMockPlugin(isBuild, prodMock));

  return vitePlugins;
};

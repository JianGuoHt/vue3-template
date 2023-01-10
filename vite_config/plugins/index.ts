import vue from '@vitejs/plugin-vue';
import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers';
import Icons from 'unplugin-icons/vite';
import IconsResolver from 'unplugin-icons/resolver';
import { FileSystemIconLoader } from 'unplugin-icons/loaders';
import { ConfigEnv, PluginOption, loadEnv } from 'vite';

export default ({ command, mode }: ConfigEnv) => {
  const root = process.cwd();
  const isBuild = command === 'build';
  const env = loadEnv(mode, root);
  console.log(env);

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
      imports: ['vue', 'pinia'],
      resolvers: [ElementPlusResolver()],
      dts: 'src/auto-import.d.ts', // 生成在src路径下名为auto-import.d.ts的声明文件
      eslintrc: {
        enabled: true, // Default `false`
        filepath: './.eslintrc-auto-import.json', // Default `./.eslintrc-auto-import.json`
        globalsPropValue: true, // Default `true`, (true | false | 'readonly' | 'readable' | 'writable' | 'writeable')
      },
    }),
    Components({
      dts: 'src/components.d.ts',
      // imports 指定组件所在位置，默认为 src/components; 有需要也可以加上 view 目录
      dirs: ['src/components/'],
      resolvers: [
        ElementPlusResolver(),
        IconsResolver({
          customCollections: ['custom'],
        }),
      ],
    }),
  ];

  return vitePlugins;
};

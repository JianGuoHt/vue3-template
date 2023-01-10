import { ConfigEnv, defineConfig, loadEnv } from 'vite';
import { resolve } from 'path';
import plugins from './build/vite/plugins';
import { wrapperEnv } from './build/utils';

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }: ConfigEnv) => {
  const root = process.cwd();
  const isBuild = command === 'build';
  const env = loadEnv(mode, root);
  const viteEnv: ViteEnv = wrapperEnv(env);

  const viteConfigEnv: ViteConfigEnv = {
    isBuild,
    viteEnv,
  };

  return {
    plugins: plugins(viteConfigEnv),

    // 别名设置
    resolve: {
      alias: {
        '@': resolve(__dirname, './src'), // 把 @ 指向到 src 目录去
      },
    },

    // 服务设置
    server: {
      host: true, // host设置为true才可以使用network的形式，以ip访问项目
      open: true, // 自动打开浏览器
      cors: true, // 跨域设置允许
      // 接口代理
      proxy: {
        '/api': {
          // 本地 8000 前端代码的接口 代理到 8888 的服务端口
          target: 'http://localhost:8888/',
          changeOrigin: true, // 允许跨域
          rewrite: (path) => path.replace('/api/', '/'),
        },
      },
    },
  };
});

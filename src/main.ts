import { createApp } from 'vue';
import App from './App.vue';
// 全局样式文件
import '/@/assets/styles/index.scss';
import { setupStore } from '/@/store';
import { setupRouter } from './router';

function bootstrap() {
  const app = createApp(App);

  // 挂载状态管理
  setupStore(app);

  // 挂载路由
  setupRouter(app);

  app.mount('#app');
}

bootstrap();

// app.config.devtools = true;

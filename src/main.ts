import '/@/design/tailwind.css';
import '/@/design/preflight.css';
import '/@/design/index.scss';
import '/@/router/icons';

import { createApp } from 'vue';

import { setupNaiveDiscreteApi } from '/@/plugins';
import { setupRouter } from '/@/router';
import { setupStore } from '/@/store';

import App from './App.vue';

function bootstrap() {
  const app = createApp(App);

  // 挂载 naive-ui 脱离上下文的 Api
  setupNaiveDiscreteApi();

  // 挂载状态管理
  setupStore(app);

  // 挂载路由
  setupRouter(app);

  app.mount('#app');
}

bootstrap();

// app.config.devtools = true;

import { createApp } from 'vue';

// 全局样式文件
import '/@/assets/styles/index.scss';

// dayjs 中文包
// import 'dayjs/locale/zh-cn';

// pinia
import store from '/@/store';

// vue-router
import router from './router';

import App from './App.vue';

const app = createApp(App);

app.use(store);
app.use(router);

app.mount('#app');

// app.config.devtools = true;

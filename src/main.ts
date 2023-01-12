import { createApp } from 'vue';

// 全局样式文件
import '/@/assets/styles/index.scss';

// Element-plus: 使用组件api时，需要手动导入所对应的样式
import 'element-plus/es/components/message/style/css';
import 'element-plus/es/components/message-box/style/css';

// dayjs 中文包
import 'dayjs/locale/zh-cn';

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

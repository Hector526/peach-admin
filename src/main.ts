import { createApp } from 'vue';

import ElementPlus from 'element-plus';
import zhCn from 'element-plus/es/locale/lang/zh-cn';
import './styles/index.scss';

import { createPinia } from 'pinia';

import App from './App.vue';
import router from './router';

createApp(App)
  .use(createPinia())
  .use(ElementPlus, { zhCn, size: 'small' })
  .use(router)
  .mount('#app');

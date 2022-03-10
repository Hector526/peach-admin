import { createApp } from 'vue';

import ElementPlus from 'element-plus';
import zhCn from 'element-plus/es/locale/lang/zh-cn';
import './styles/index.scss';

import { createPinia } from 'pinia';
import { registerStore } from './store';

import App from './App.vue';
import router from './router';

const app = createApp(App);

app.use(createPinia());
registerStore();

app.use(ElementPlus, { zhCn, size: 'small' });

app.use(router);

app.mount('#app');

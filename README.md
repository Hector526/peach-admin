# peach-admin

## 简介

**peach-admin** 是一个基于`vue3` `vite2` `Element-Plus` `TypeScript`等主流技术开发，为开发医疗信息化领域开箱即用的中后台前端解决方案。项目会使用前端较新的技术栈，可以作为项目的启动模版。搭建教程见教程章节。

## 技术栈

技术栈：Vue3.0 + Vite + TypeScript + Element Plus + Vue Router + axios + Pinia

规范化：Eslint + Airbnb JavaScript Style + husky + lint-staged + commitlint

包管理：yarn

## 教程

[从零开始一步一步搭建前端项目](https://juejin.cn/column/7068213300734984228)

## 目录结构

系统的目录结构

```
├── .husky                // Git hooks配置
├── config                // 常量和vite插件配置
├── mock                  // mock接口定义
├── public                
├── src     
│    ├── api             // api请求   
│    ├── assets          // 静态文件->图片   
│    ├── components      // 业务通用组件  
│    ├── models          // ts类型
│    ├── pages           // 业务页面 
│    ├── router          // 路由文件   
│    ├── store           // 状态管理 
│    ├── styles          // 样式文件 
│    ├── utils           // 工具类   
│    ├── App.vue         // vue模板入口   
│    ├── main.ts         // vue模板js 
├── tsconfig.json        // ts配置
└── vite.config.ts       // vite全局配置  
```

## 功能

### 代码规范

目前多数大厂团队一般使用[husky](https://github.com/typicode/husky)和 [lint-staged](https://github.com/okonet/lint-staged) 来约束代码规范，

- 通过`pre-commit`实现lint检查、代码格式化等。
- 配合Git hooks钩子（commit前或提交前执行：pre-commit => npm run lint:lint-staged）
- ESLint 配置（`.eslintrc.js` 和 `.eslintignore`），详细请看对应的配置文件。

## API和组件自动导入按需加载

```ts
// vite.config.ts
import AutoImport from 'unplugin-auto-import/vite';        
import Components from 'unplugin-vue-components/vite';   

export default {
  plugins: [
    AutoImport({
      imports: ['vue', 'vue-router', 'pinia'],        // ++
      // 第三方组件库的解析器
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      // dirs 指定组件所在位置，默认为 src/components
      // 可以让我们使用自己定义组件的时候免去 import 的麻烦
      dirs: ['src/components/'],                     // ++
      // 配置需要将哪些后缀类型的文件进行自动按需引入
      extensions: ['vue'],                           // ++
      // 解析的 UI 组件库，这里以 Element Plus 为例
      resolvers: [ElementPlusResolver()],
    }),
  ],
}
```

## axios封装

### 安装

```powershell
yarn add axios
```

### 封装

在src文件夹下创建utils->http文件夹，在http文件夹下创建baseAxios.ts文件。

```ts
import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import qs from 'qs';
import isPlainObject from 'lodash/isPlainObject';
import router from '@router/index';
import { IResponse, RequestOptions } from '@models/axios/axios';

// 如果请求话费了超过 `timeout` 的时间，请求将被中断
axios.defaults.timeout = 1000 * 30;
// 表示跨域请求时是否需要使用凭证
axios.defaults.withCredentials = false;
// 允许跨域
axios.defaults.headers.post['Access-Control-Allow-Origin-Type'] = '*';
// 返回支持的状态码
axios.defaults.validateStatus = function (status: number) {
  return status >= 200 && status <= 500;
};

const axiosInstance: AxiosInstance = axios.create({
  baseURL: `${import.meta.env.BASE_URL}`,
});

// axios实例拦截响应
axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// axios实例拦截请求
axiosInstance.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    config.headers['Accept-Language'] = 'zh-CN';
    // 防止get请求缓存
    if (config.method === 'get') {
      config.params = {
        ...config.params,
        ...{ _t: new Date().getTime() },
      };
    }

    if (isPlainObject(config.data)) {
      // eslint-disable-next-line no-param-reassign
      config.data = {
        ...config.data,
      };
      if (config.headers?.['content-type']) {
        const contentType: string = config.headers['content-type'] + '';
        if (/^application\/x-www-form-urlencoded/.test(contentType)) {
          // form形式编码
          config.data = qs.stringify(config.data);
        }
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

const request = <T = any>(
  config: AxiosRequestConfig,
  options?: RequestOptions
): Promise<T> => {
  const conf = config;
  return new Promise((resolve, reject) => {
    axiosInstance
      .request<any, AxiosResponse<IResponse>>(conf)
      .then((res: AxiosResponse<IResponse>) => {
        const data: any = res;
        resolve(data as T);
      })
      .catch((error) => reject(error));
  });
};

// 封装get
export function get<T = any>(
  config: AxiosRequestConfig,
  options?: RequestOptions
): Promise<T> {
  return request({ ...config, method: 'GET' }, options);
}
// 封装post
export function post<T = any>(
  config: AxiosRequestConfig,
  options?: RequestOptions
): Promise<T> {
  return request({ ...config, method: 'POST' }, options);
}

export default request;
export type { AxiosInstance, AxiosResponse };
```

### 接口

在`src`文件下创建`api`文件夹，在`api`文件夹下创建各个接口定义，如创建`userLogin.ts`文件。

```ts
import { post } from '@utils/http/baseAxios';
import { IResponse } from '@models/axios/axios';
import { LoginData } from '@models/user/user';

/**
 * @description: 用户登录
 * @params {LoginData} params
 * @return {Promise}
 */
export const login = (params: LoginData): Promise<IResponse> => {
  return post({ url: 'user/login', params }).then((res) => res.data);
};
```

### 使用

安装await-to-js

```powershell
yarn add await-to-js
```

```html
<template>
  <el-button @click="sendLogin">sendLogin</el-button>
</template><script setup lang="ts" name="Login">
import to from 'await-to-js';
import { login as userLogin} from '@api/userLogin';
import { IResponse } from '@models/axios/axios';
import { LoginData } from '@models/user/user';

const $router = useRouter();
const sendLogin = async () => {
  const params = {
    username: 'admin',
    password: '123456',
  } as LoginData;
  const [err, res] = await to<IResponse>(userLogin(params));
  if (err) {
    // 错误处理
    console.log(err);
  }
  const { code, data, msg } = res;
  console.log(code, data, msg);
};
</script>
```

## mock数据

### 安装

```ts
yarn add mockjs vite-plugin-mock --dev
```

### 配置

```ts
// vitePlugins.ts
import { viteMockServe } from 'vite-plugin-mock';      // ++

export default (env: ConfigEnv) => {
  constisBuild = env.command === 'build';
  const vitePlugins: (Plugin | Plugin[])[] = [
    // ...
  ];
  // ++
  if (!isBuild) {
    vitePlugins.push(
      viteMockServe({
        ignore: /^\_/,
        mockPath: 'mock',
        localEnabled: !isBuild,
        // 实际开发关闭
        prodEnabled: false,
        injectCode: `
            import { setupProdMockServer } from '../mock/_createProductionServer';
            setupProdMockServer();
        `,
      })
    );
  }
  return vitePlugins;
};

```

在项目根目录下创建mock文件夹，在mock文件夹下创建_createProdMockServer.ts文件，批量加载mock文件夹下的所有接口。

```ts
// _createProdMockServer.ts
import { createProdMockServer } from 'vite-plugin-mock/es/createProdMockServer';
// 批量加载
const modules = import.meta.globEager('./mock/*.ts');

const mockModules: Array<string> = [];
Object.keys(modules).forEach((key) => {
  if (key.includes('/_')) {
    return;
  }
  mockModules.push(...modules[key].default);
});

export default function setupProdMockServer() {
  createProdMockServer(mockModules);
}
```

### 测试

在mock文件夹下创建user.ts，加入模拟登录接口。

```ts
import { MockMethod } from 'vite-plugin-mock';

export default [
  {
    url: '/textMock',
    timeout: 200,
    method: 'POST',
    response: () => {
      return {
        code: 0,
        data: {
          token: 'eca4bb1529bb5b4dcd3c9aa68e9e185d',
          expire: 1200,
          onLine: true,
        },
        msg: 'success',
      };
    },
  },
] as MockMethod[];
```

## 支持Pinia

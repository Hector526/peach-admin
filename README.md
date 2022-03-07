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

### axios封装

### mock数据

### 支持Pinia

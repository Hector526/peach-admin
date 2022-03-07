import { defineConfig, loadEnv, ConfigEnv } from 'vite';
import { resolve } from 'path';
import vitePlugins from './config/vitePlugins';

import {
  VITE_PORT,
  VITE_DROP_CONSOLE,
  API_BASE_URL,
  API_TARGET_URL,
} from './config/constant';

export default defineConfig((env: ConfigEnv) => {
  const viteEnv = loadEnv(env.mode, `.env.${env.mode}`);
  return {
    base: viteEnv.VITE_BASE,
    resolve: {
      alias: {
        '@': resolve(__dirname, 'src'),
        '@config': resolve(__dirname, './config'),
        '@utils': resolve(__dirname, './src/utils'),
        '@api': resolve(__dirname, './src/api'),
        '@router': resolve(__dirname, './src/router'),
        '@models': resolve(__dirname, './src/models'),
      },
    },
    css: {
      preprocessorOptions: {
        scss: {
          javascriptEnabled: true,
          additionalData: `@use "@/styles/element/index.scss" as *;`,
        },
      },
    },
    plugins: vitePlugins(env),
    // server
    server: {
      hmr: { overlay: false }, // 禁用或配置 HMR 连接 设置 server.hmr.overlay 为 false 可以禁用服务器错误遮罩层
      // 服务配置
      port: VITE_PORT, // 类型： number 指定服务器端口;
      open: false, // 类型： boolean | string在服务器启动时自动在浏览器中打开应用程序；
      cors: false, // 类型： boolean | CorsOptions 为开发服务器配置 CORS。默认启用并允许任何源
      host: '0.0.0.0', // IP配置，支持从IP启动
      proxy: {
        [API_BASE_URL]: {
          target: API_TARGET_URL,
          changeOrigin: true,
          rewrite: (path) => path.replace(new RegExp(`^${API_BASE_URL}`), ''),
        },
      },
    },
    build: {
      target: 'es2015',
      terserOptions: {
        compress: {
          keep_infinity: true,
          drop_console: VITE_DROP_CONSOLE,
        },
      },
      rollupOptions: {
        // 确保外部化处理那些你不想打包进库的依赖
        external: [],
        // https://rollupjs.org/guide/en/#big-list-of-options
      },
      watch: {
        // https://rollupjs.org/guide/en/#watch-options
      },
      // Turning off brotliSize display can slightly reduce packaging time
      brotliSize: false,
      chunkSizeWarningLimit: 2000,
    },
  };
});

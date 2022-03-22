import { defineConfig, loadEnv, ConfigEnv } from 'vite';
import { resolve } from 'path';
import vitePlugins from './config/vitePlugins';
// import { createVitePlugins } from './config/vitePlugins/index';

import {
  VITE_PORT,
  VITE_DROP_CONSOLE,
  API_BASE_URL,
  API_TARGET_URL,
  MOCK_API_BASE_URL,
  MOCK_API_TARGET_URL,
} from './config/constant';

export default defineConfig((env: ConfigEnv) => {
  const viteEnv = loadEnv(env.mode, `.env.${env.mode}`);
  return {
    base: viteEnv.VITE_BASE,
    resolve: {
      alias: {
        '@': resolve(__dirname, 'src'),
        '@config': resolve(__dirname, './config'),
        '@utils': resolve(__dirname, 'src/utils'),
        '@api': resolve(__dirname, 'src/api'),
        '@router': resolve(__dirname, 'src/router'),
        '@models': resolve(__dirname, 'src/models'),
        '@store': resolve(__dirname, 'src/store'),
      },
    },
    css: {
      preprocessorOptions: {
        scss: {
          javascriptEnabled: true,
          additionalData: `@use "@/styles/element/theme.scss" as *;`,
        },
      },
    },
    plugins: vitePlugins(env),
    // server
    server: {
      // 禁用或配置 HMR 连接 设置 server.hmr.overlay 为 false 可以禁用服务器错误遮罩层
      hmr: { overlay: false },
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
        [MOCK_API_BASE_URL]: {
          target: MOCK_API_TARGET_URL,
          changeOrigin: true,
          rewrite: (path) =>
            path.replace(new RegExp(`^${MOCK_API_BASE_URL}`), '/api'),
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
        output: {
          // eslint-disable-next-line consistent-return
          manualChunks(id) {
            // 将pinia的全局库实例打包进vendor，避免和页面一起打包造成资源重复引入
            if (id.includes(resolve(__dirname, './src/store/index.ts'))) {
              return 'vendor';
            }
          },
        },
      },
      watch: {
        // https://rollupjs.org/guide/en/#watch-options
      },
      // Turning off brotliSize display can slightly reduce packaging time
      brotliSize: false,
      sourcemap: true,
      chunkSizeWarningLimit: 2000,
    },
  };
});

/**
 * @name createVitePlugins
 * @description 封装plugins数组统一调用
 */
import type { Plugin, ConfigEnv } from 'vite';
import vue from '@vitejs/plugin-vue';
import PkgConfig from 'vite-plugin-package-config';
import OptimizationPersist from 'vite-plugin-optimize-persist';
// import VueSetupExtend from 'vite-plugin-vue-setup-extend';
import { AutoImportDeps } from './autoImport';
import { AutoRegistryComponents } from './component';
import { ConfigCompressPlugin } from './compress';
import { ConfigRestartPlugin } from './restart';
import { ConfigMockPlugin } from './mock';

export function createVitePlugins(env: ConfigEnv) {
  const isBuild = env.command === 'build';

  const vitePlugins: (Plugin | Plugin[])[] = [
    // vue支持
    vue({
      include: [/\.vue$/],
    }),
    // 自动按需引入组件
    AutoRegistryComponents(),
    // 自动按需引入依赖
    AutoImportDeps(),
    // 开启.gz压缩  rollup-plugin-gzip
    ConfigCompressPlugin(),
    // VueSetupExtend(),
    // 监听配置文件改动重启
    ConfigRestartPlugin(),
    PkgConfig(),
    OptimizationPersist(),
  ];

  // vite-plugin-mock
  vitePlugins.push(ConfigMockPlugin(isBuild));

  return vitePlugins;
}

export default createVitePlugins;

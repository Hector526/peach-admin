import type { Plugin } from 'vite';
import vue from '@vitejs/plugin-vue';

import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers';
// import VueSetupExtend from 'vite-plugin-vue-setup-extend';
import ViteRestart from 'vite-plugin-restart';
import OptimizationPersist from 'vite-plugin-optimize-persist';
import PkgConfig from 'vite-plugin-package-config';
import { viteMockServe } from 'vite-plugin-mock';

import { ConfigEnv } from 'vite';

export default (env: ConfigEnv) => {
  const isBuild = env.command === 'build';
  const vitePlugins: (Plugin | Plugin[])[] = [
    vue({
      include: [/\.vue$/],
    }),
    AutoImport({
      dts: './src/auto-imports.d.ts',
      imports: ['vue', 'pinia', 'vue-router'],
      // Generate corresponding .eslintrc-auto-import.json file.
      // eslint globals Docs - https://eslint.org/docs/user-guide/configuring/language-options#specifying-globals
      eslintrc: {
        enabled: true, // Default `false`
        filepath: './.eslintrc-auto-import.json', // Default `./.eslintrc-auto-import.json`
        globalsPropValue: true, // Default `true`, (true | false | 'readonly' | 'readable' | 'writable' | 'writeable')
      },
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      dts: './src/components.d.ts',
      extensions: ['vue'],
      include: [/\.vue$/, /\.vue\?vue/],
      // imports 指定组件所在位置，默认为 src/components; 有需要也可以加上 view 目录
      dirs: ['src/components/'],
      resolvers: [ElementPlusResolver({ importStyle: 'sass' })],
    }),
    // VueSetupExtend(),
    ViteRestart({
      restart: ['*.config.[jt]s', '**/config/*.[jt]s'],
    }),
    PkgConfig(),
    OptimizationPersist(),
  ];
  if (!isBuild) {
    vitePlugins.push(
      viteMockServe({
        // eslint-disable-next-line no-useless-escape
        ignore: /^\_/,
        mockPath: 'mock',
        localEnabled: !isBuild,
        // 实际开发请关闭，会影响打包体积
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

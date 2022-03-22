/**
 * @name ConfigMockPlugin
 * @description 引入mockjs，本地模拟接口
 */
import { viteMockServe } from 'vite-plugin-mock';

export const ConfigMockPlugin = (isBuild: boolean) => {
  return viteMockServe({
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
  });
};

export default ConfigMockPlugin;

/**
 * @name  AutoRegistryComponents
 * @description 按需加载，自动引入组件
 */
import Components from 'unplugin-vue-components/vite';
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers';

export const AutoRegistryComponents = () => {
  return Components({
    dts: 'src/components.d.ts',
    extensions: ['vue'],
    include: [/\.vue$/, /\.vue\?vue/],
    // imports 指定组件所在位置，默认为 src/components; 有需要也可以加上 view 目录
    dirs: ['src/components/'],
    resolvers: [ElementPlusResolver({ importStyle: 'sass' })],
  });
};

export default AutoRegistryComponents;

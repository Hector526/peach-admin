import useTokenStore from '@store/modules/user';

const piniaStore: any = {};

/**
 * 注册app状态库
 */
export const registerStore = () => {
  piniaStore.useTokenStore = useTokenStore();
};

export default piniaStore;

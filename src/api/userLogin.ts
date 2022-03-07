import { get, post } from '@utils/http/baseAxios';
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

/**
 * @description: 顶部菜单
 * @params
 * @return {Promise}
 */
export const getTopMenu = (): Promise<IResponse> => {
  return get({ url: 'sys/menu/top/list' }).then((res) => res.data);
};

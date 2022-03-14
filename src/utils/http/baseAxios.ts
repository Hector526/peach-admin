/* eslint-disable dot-notation */
/* eslint-disable no-param-reassign */
import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import qs from 'qs';
import isPlainObject from 'lodash/isPlainObject';
import router from '@router/index';
import { IResponse, RequestOptions } from '@models/axios/axios';
import piniaStore from '@store/index';

const { getAccessToken } = piniaStore.useTokenStore;

// 如果请求话费了超过 `timeout` 的时间，请求将被中断
axios.defaults.timeout = 1000 * 180;
// 表示跨域请求时是否需要使用凭证
axios.defaults.withCredentials = false;
// 允许跨域
axios.defaults.headers.post['Access-Control-Allow-Origin-Type'] = '*';
// 返回其他状态码
// eslint-disable-next-line func-names
axios.defaults.validateStatus = function (status: number) {
  return status >= 200 && status <= 500;
};

const axiosInstance: AxiosInstance = axios.create({
  baseURL: `${import.meta.env.VITE_API_BASEURL}`,
});

// axios实例拦截响应
axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => {
    if (response.status === 200) {
      if (Number(response.data.code) === 401) {
        const message = response.data.msg || '未知错误';
        setTimeout(() => {
          router.replace({
            path: '/login',
          });
        }, 1000);
        return Promise.reject(message);
      }
      return response;
    }
    return Promise.reject(new Error('未知错误'));
  },
  (error) => {
    return Promise.reject(error);
  }
);

// axios实例拦截请求
axiosInstance.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    // eslint-disable-next-line no-param-reassign
    config.headers['Accept-Language'] = 'zh-CN';
    const token =
      getAccessToken() || window.sessionStorage.getItem('access_token');

    if (import.meta.env.VITE_BACKEND_SECURITY === 'SpringSecurity') {
      if (token !== null) {
        config.headers['Authorization'] = `bearer ${token}`;
      } else {
        config.headers['Authorization'] = `Basic ${
          import.meta.env.VITE_SECURITY_BASIC
        }`;
      }
    }

    if (
      import.meta.env.VITE_BACKEND_SECURITY === 'ApacheShiro' &&
      token !== null
    ) {
      config.headers['token'] = token;
    }

    if (config.method === 'get') {
      // eslint-disable-next-line no-param-reassign
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
        // eslint-disable-next-line prefer-template
        const contentType: string = config.headers['content-type'] + '';
        if (/^application\/x-www-form-urlencoded/.test(contentType)) {
          // eslint-disable-next-line no-param-reassign
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
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  options?: RequestOptions
): Promise<T> => {
  const conf = config;
  return new Promise((resolve, reject) => {
    axiosInstance
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .request<any, AxiosResponse<IResponse>>(conf)
      .then((res: AxiosResponse<IResponse>) => {
        // const {
        //   data: { data },
        // } = res;
        const data: any = res;
        resolve(data as T);
      })
      .catch((error) => reject(error));
  });
};

export function get<T = any>(
  config: AxiosRequestConfig,
  options?: RequestOptions
): Promise<T> {
  return request({ ...config, method: 'GET' }, options);
}

export function post<T = any>(
  config: AxiosRequestConfig,
  options?: RequestOptions
): Promise<T> {
  return request({ ...config, method: 'POST' }, options);
}

export default request;
export type { AxiosInstance, AxiosResponse };

import { MockMethod } from 'vite-plugin-mock';

export default [
  {
    url: '/user/profile',
    timeout: 200,
    method: 'get',
    response: () => {
      return {
        code: 0,
        data: '13',
      };
    },
  },
  {
    url: '/user/login',
    timeout: 200,
    method: 'post',
    response: () => {
      return {
        code: 0,
        data: '13',
      };
    },
  },
  {
    url: '/user/logout',
    timeout: 200,
    method: 'post',
    response: () => {
      return {
        code: 0,
        data: '13',
      };
    },
  },
  {
    url: '/text',
    method: 'post',
    rawResponse: () => {
      return {
        code: 0,
        data: '13',
      };
    },
  },
] as MockMethod[];

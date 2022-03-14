import { MockMethod } from 'vite-plugin-mock';

export default [
  {
    url: '/api/user/login',
    timeout: 200,
    method: 'POST',
    response: () => {
      return {
        code: 0,
        data: {
          access_token: 'de33b0b5-792f-4c65-b487-18c260831f56',
          code: 0,
          expires_in: 49933,
          refresh_token: 'addc8732-8581-4aac-b252-d30077ece6bb',
          scope: 'all',
          token_type: 'bearer',
        },
        msg: 'success',
      };
    },
  },
  {
    url: '/api/captcha',
    timeout: 200,
    method: 'GET',
    response: () => {
      return {
        code: 0,
        data: {
          display: true,
        },
        msg: 'success',
      };
    },
  },
  {
    url: '/api/sys/menu/top/list',
    timeout: 200,
    method: 'GET',
    response: () => {
      return {
        code: 0,
        msg: 'success',
        data: [
          {
            code: 'managementBackstage',
            createDate: '2020-12-03 17:39:18',
            createDept: null,
            creator: '1067246875800000001',
            id: '0',
            name: '管理后台',
            sort: 0,
            source: null,
            status: 0,
            updateDate: '2020-12-03 17:39:18',
            updater: '1067246875800000001',
          },
          {
            code: 'taskConsole',
            createDate: '2020-12-03 17:39:18',
            createDept: null,
            creator: '1067246875800000001',
            id: '1606903625237446820',
            name: '任务控制台',
            sort: 0,
            source: null,
            status: 0,
            updateDate: '2020-12-03 17:39:18',
            updater: '1067246875800000001',
          },
          {
            code: 'settingBackstage',
            createDate: '2020-12-03 17:39:18',
            createDept: null,
            creator: '1067246875800000001',
            id: '1606904052349903163',
            name: '设置后台',
            sort: 0,
            source: null,
            status: 0,
            updateDate: '2020-12-03 17:39:18',
            updater: '1067246875800000001',
          },
          {
            code: 'taskTraingTransfer',
            createDate: '2021-01-14 18:04:21',
            createDept: null,
            creator: '1067246875800000001',
            id: '1606904052349904143',
            name: '训练考核控制台',
            sort: 0,
            source: null,
            status: 0,
            updateDate: '2021-01-14 18:04:26',
            updater: '1067246875800000001',
          },
          {
            code: 'taskTransfer',
            createDate: '2021-01-14 18:11:16',
            createDept: null,
            creator: '1067246875800000001',
            id: '1606904052349904144',
            name: '专家抽调控制台',
            sort: 0,
            source: null,
            status: 0,
            updateDate: '2021-01-14 18:11:24',
            updater: '1067246875800000001',
          },
        ],
      };
    },
  },
  {
    url: '/api/user/logout',
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
    url: '/api/textMock',
    timeout: 200,
    method: 'POST',
    response: () => {
      return {
        code: 0,
        data: {
          token: 'eca4bb1529bb5b4dcd3c9aa68e9e185d',
          expire: 1200,
          onLine: true,
        },
        msg: 'success',
      };
    },
  },
] as MockMethod[];

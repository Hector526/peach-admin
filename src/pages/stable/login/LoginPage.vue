<template>
  <div>登录页面</div>
  <el-button @click="goNotFoundpage">跳转404页面</el-button>
  <el-button @click="sendLogin">sendLogin</el-button>
  <el-button @click="sendMTopMenu">获取顶级菜单</el-button>
</template>
<script setup lang="ts" name="Login">
import to from 'await-to-js';
import { login as userLogin, getTopMenu } from '@api/userLogin';
import { IResponse } from '@models/axios/axios';
import { LoginData } from '@models/user/user';

const $router = useRouter();

const goNotFoundpage = () => {
  $router.push({
    name: 'notFound',
  });
};
const sendLogin = async () => {
  const params = {
    username: '3242',
    password: '23432',
  } as LoginData;
  const [err, result] = await to<IResponse>(userLogin(params));
  if (err) {
    // TODO: 错误处理
    console.log(err);
  }
  const { code, data, msg } = result;

  console.log(code, data, msg);
};
const sendMTopMenu = async () => {
  const [err, result] = await to<IResponse>(getTopMenu());
  if (err) {
    // TODO: 错误处理
    console.log(err);
  }
  const { data } = result;

  console.log(data);
};
</script>

<style scoped lang="scss"></style>

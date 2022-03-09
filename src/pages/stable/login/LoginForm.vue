<template>
  <div class="login-form-main">
    <div class="login-form-top">
      <p>疾控应急作业管理信息系统</p>
    </div>
    <el-form
      ref="refForm"
      status-icon
      :model="loginForm"
      :rules="loginRules"
      class="login-form-content"
      label-width="0"
      size="large"
      ><el-form-item prop="username"
        ><el-input
          v-model="loginForm.username"
          auto-complete="off"
          placeholder="账号"
        ></el-input></el-form-item
      ><el-form-item prop="password"
        ><el-input
          v-model="loginForm.password"
          auto-complete="off"
          placeholder="密码"
          show-password
        ></el-input
      ></el-form-item>
      <el-form-item
        ><el-button
          class="login-submit"
          type="primary"
          :loading="isLoddingVisible"
          @click.prevent="handleLogin(refForm)"
          >登 录</el-button
        ></el-form-item
      ></el-form
    >
    <div class="login-form-last">
      <el-button type="text" size="default" @click="goToReset()"
        >忘记密码?</el-button
      >
    </div>
  </div>
</template>

<script lang="ts" setup name="LoginForm">
import { sha256 } from '@utils/crypto';
import to from 'await-to-js';
import { login as userLogin } from '@api/userLogin';
import useTokenStore from '@store/modules/user';

import { IResponse } from '@models/axios/axios';
import { LoginData } from '@models/user/user';
import { ElMessage } from 'element-plus';
import type { ElForm } from 'element-plus';

type FormInstance = InstanceType<typeof ElForm>;

const emit = defineEmits(['change-login-or-reset']);

const router = useRouter();
const userStore = useTokenStore();

const isLoddingVisible = ref<boolean>(false);

const refForm = ref<FormInstance>();
const loginForm = reactive({
  username: '',
  password: '',
});
const loginRules: any = reactive({
  username: [{ required: 'true', message: '账户不能为空', trigger: 'blur' }],
  password: [{ required: 'true', message: '密码不能为空', trigger: 'blur' }],
});

const handleLogin = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  isLoddingVisible.value = true;
  formEl.validate(async (valid: boolean) => {
    if (valid) {
      const { username, password } = loginForm;
      const passwordSHA526 = sha256(password);
      const loginParams = {
        username,
        password: passwordSHA526,
      } as LoginData;
      const [err, result] = await to<IResponse>(userLogin(loginParams));
      if (err) {
        ElMessage.error(err);
        isLoddingVisible.value = false;
        return;
      }
      const { code, data, msg } = result;
      console.log(code, data, msg);
      const isSaveAccessTokenRes = await userStore.setAccessToken(
        data.access_token
      );
      if (!isSaveAccessTokenRes) {
        ElMessage.error('登录凭证存储失败！');
        return;
      }
      router.push({
        path: '/notFound',
      });
    }
    isLoddingVisible.value = false;
  });
};

const goToReset = () => {
  emit('change-login-or-reset', false);
};
</script>

<style lang="scss" scoped>
@import '@/styles/login/login.scss';
</style>

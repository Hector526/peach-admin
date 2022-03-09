<template>
  <div class="login-page">
    <div class="login-container">
      <div class="login-left"></div>
      <div class="login-right">
        <transition name="fade">
          <div v-if="isLoginVisible" class="login-form">
            <LoginForm @change-login-or-reset="goBackLogin" />
          </div>
          <div v-else class="reset-form">
            <ResetForm @change-login-or-reset="goResetPassword" />
          </div>
        </transition>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup name="Login">
import LoginForm from './LoginForm.vue';
import ResetForm from './ResetForm.vue';

// 初始化sessionStorage
window.sessionStorage.clear();

const isLoginVisible = ref<boolean>(true);
const goBackLogin = (value) => {
  window.sessionStorage.clear();
  isLoginVisible.value = value;
};
const goResetPassword = (value) => {
  isLoginVisible.value = value;
};
</script>

<style lang="scss" scoped>
@import '@/styles/login/login.scss';
</style>

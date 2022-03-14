<template>
  <div class="reset-form">
    <el-button type="primary" size="default" @click="goBackLogin()"
      >返回登录</el-button
    >
  </div>
</template>

<script lang="ts" setup name="ResetForm">
const emit = defineEmits(['change-login-or-reset']);

const goBackLogin = () => {
  emit('change-login-or-reset', true);
};
</script>

<style lang="scss" scoped>
@import '@/styles/login/login.scss';
</style>

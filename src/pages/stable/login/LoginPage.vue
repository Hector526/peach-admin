<template>
  <div>登录页面</div>
  <el-button @click="goNotFoundpage">跳转404页面</el-button>
</template>
<script setup lang="ts" name="Login">
import { useRouter } from 'vue-router';

const router = useRouter();
const goNotFoundpage = () => {
  router.push({
    name: 'notFound',
  });
};
</script>

<style scoped lang="scss"></style>

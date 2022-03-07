<template>
  <h1>{{ msg }}</h1>
  <el-button @click="goNotFoundpage">跳转404页面</el-button>
</template>
<script setup lang="ts">
const msg = ref<string>('Hello World!');

const $router = useRouter();
const goNotFoundpage = () => {
  $router.push({
    name: 'notFound',
  });
};
</script>
<style scoped lang="scss"></style>

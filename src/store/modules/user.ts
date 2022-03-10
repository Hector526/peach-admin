import { ref } from 'vue';
import { defineStore } from 'pinia';

const useTokenStore = defineStore('accessToken', () => {
  const accesTokenValue = ref<string>('');

  function getAccessToken() {
    return accesTokenValue.value;
  }

  async function setAccessToken(token: string) {
    return new Promise((resolve) => {
      accesTokenValue.value = token;
      window.sessionStorage.setItem('access_token', token);
      resolve(true);
    });
  }

  async function clearAccessToken() {
    return new Promise((resolve) => {
      accesTokenValue.value = '';
      window.sessionStorage.removeItem('access_token');
      resolve(true);
    });
  }

  return { accesTokenValue, getAccessToken, setAccessToken, clearAccessToken };
});

export default useTokenStore;

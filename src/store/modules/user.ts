import { defineStore } from 'pinia';

const useTokenStore = defineStore('accessToken', {
  state: () => ({
    access_token: null,
  }),
  getters: {
    getAccessToken: (state) => state.access_token,
  },
  actions: {
    setAccessToken(token) {
      return new Promise((resolve) => {
        this.access_token = token;
        window.sessionStorage.setItem('access_token', token);
        resolve(true);
      });
    },
    async clearAccessToken() {
      return new Promise((resolve) => {
        this.access_token = null;
        window.sessionStorage.removeItem('access_token');
        resolve(true);
      });
    },
  },
});
export default useTokenStore;

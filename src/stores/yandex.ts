import type { YandexTokenObject } from 'api/types';
import { ref, Ref } from 'vue';
import { defineStore } from 'pinia';

export const useYandexStore = defineStore('yandex', () => {
  const token: Ref<YandexTokenObject | null> = ref(null);
  const setToken = (newToken: YandexTokenObject) => {
    token.value = newToken;
  };
  return {
    token,
    setToken,
  };
});

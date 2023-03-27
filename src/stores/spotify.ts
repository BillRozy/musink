import { ref, Ref } from 'vue';
import { defineStore } from 'pinia';
import type { SpotifyTokenObject } from 'api/types';

export const useSpotifyStore = defineStore('spotify', () => {
  const token: Ref<SpotifyTokenObject | null> = ref(null);
  const setToken = (newToken: SpotifyTokenObject) => {
    token.value = newToken;
  };
  return {
    token,
    setToken,
  };
});

import { ref } from 'vue';
import { defineStore } from 'pinia';

export const useYandexStore = defineStore('yandex', () => {
  const playlist = ref([]);
  const user = ref(null);
  const loadPlaylist = () => {
    // save to playlist
  };
  const login = async (username: string, password: string) => {
    // save to user
  };
  return { playlist, user, loadPlaylist, login };
});

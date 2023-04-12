import { default as useYandexAuthAPI } from './yandex';
import { default as useSpotifyAuthAPI } from './spotify';
import type { MusinkAPIProvider } from '../src/types/global';

export default (authProvider: MusinkAPIProvider) => {
  switch (authProvider) {
    case 'yandex':
      return useYandexAuthAPI();
    case 'spotify':
      return useSpotifyAuthAPI();
  }
};

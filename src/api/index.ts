import { default as useYandexRestAPI } from './yandex';
import { default as useSpotifyRestAPI } from './spotify';
import type { MusinkAPIProvider } from 'src/types/global';

export default (authProvider: MusinkAPIProvider) => {
  switch (authProvider) {
    case 'yandex':
      return useYandexRestAPI();
    case 'spotify':
      return useSpotifyRestAPI();
  }
};

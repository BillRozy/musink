import { RestAPI } from 'api/types';
import { YandexUserProfile } from './types';
import { storeToRefs } from 'pinia';
import { useProviderStore } from 'src/stores';
import { fetchJSON } from '../helpers';
export default (): RestAPI => {
  const store = useProviderStore('yandex');
  const { token } = storeToRefs(store);
  const BASE_API = 'https://api.music.yandex.net';
  const PASSPORT_API = 'https://login.yandex.ru';
  const GET = async <T>(
    endpoint: string,
    baseApi: string = BASE_API
  ): Promise<T> => {
    await store.checkOrRefreshToken();
    const resp = await fetchJSON(`${baseApi}/${endpoint}`, {
      method: 'GET',
      headers: {
        Authorization: `OAuth ${token.value?.access_token}`,
        'User-Agent': 'Yandex-Music-API',
      },
    });
    return resp as T;
  };
  return {
    async getCurrentUser() {
      const resp = await GET<YandexUserProfile>('info', PASSPORT_API);
      return {
        name: resp.real_name,
        email: resp.default_email,
        id: `${resp.id}`,
        serviceURL: 'todo',
      };
    },
    async getFavoriteTracks() {
      return Promise.resolve([
        {
          name: 'stub',
          id: 'stub',
        },
      ]);
    },
  };
};

import { RestAPI } from 'api/types';
import {
  FavoriteTracksResponseData,
  StupidYandexResponse,
  YandexAccountStatus,
  TracksRequestData,
  TracksResponseData,
} from './types';
import { storeToRefs } from 'pinia';
import { useProviderStore } from 'src/stores';
import { fetch } from '../helpers';
import { trackConverter } from 'api/yandex/converters';
import { UserProfile } from 'src/types/models';

export default (): RestAPI => {
  const store = useProviderStore('yandex');
  const { token } = storeToRefs(store);
  const BASE_API = 'https://api.music.yandex.net';
  const GET = async <T>(
    endpoint: string,
    baseApi: string = BASE_API
  ): Promise<T> => {
    await store.checkOrRefreshToken();
    const resp = await fetch(`${baseApi}/${endpoint}`, {
      method: 'GET',
      headers: {
        Authorization: `OAuth ${token.value?.access_token}`,
        'User-Agent': 'Yandex-Music-API',
      },
    });
    console.log(resp.url);
    if (resp.ok) {
      return resp.body as T;
    } else {
      console.log(resp.error);
      throw new Error(resp.error?.message);
    }
  };
  const POST = async <B extends Record<string, any>, T>(
    endpoint: string,
    {
      baseApi = BASE_API,
      body,
    }: {
      baseApi?: string;
      body?: B;
    }
  ): Promise<T> => {
    await store.checkOrRefreshToken();
    const resp = await fetch(`${baseApi}/${endpoint}`, {
      method: 'POST',
      headers: {
        Authorization: `OAuth ${token.value?.access_token}`,
        'User-Agent': 'Yandex-Music-API',
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams(body),
    });
    console.log(resp.url);
    console.log(resp);
    if (resp.ok) {
      return resp.body as T;
    } else {
      console.log(resp.error);
      throw new Error(resp.error?.message);
    }
  };
  const _tracksByIds = async (tracksIds: string[]) => {
    const resp = await POST<
      TracksRequestData,
      StupidYandexResponse<TracksResponseData>
    >('tracks', {
      body: {
        'track-ids': tracksIds,
        'with-positions': false,
      },
    });
    return resp.result;
  };
  return {
    async getCurrentUser() {
      const resp = await GET<StupidYandexResponse<YandexAccountStatus>>(
        'account/status'
      );
      const { uid, fullName } = resp.result.account;
      return {
        name: fullName,
        email: resp.result.defaultEmail,
        id: `${uid}`,
        serviceURL: 'todo',
      };
    },
    async getFavoriteTracks(userInfo?: UserProfile) {
      const resp = await GET<StupidYandexResponse<FavoriteTracksResponseData>>(
        `users/${userInfo?.id}/likes/tracks`
      );
      const tracks = await _tracksByIds(
        resp.result.library.tracks.map((track) => track.id)
      );
      // loop and get all tracks
      return tracks.map(trackConverter);
    },
  };
};

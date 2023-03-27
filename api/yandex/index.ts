import { AuthAPI, OAuthTokenObject, RestAPI } from 'api/types';
import { YandexUserProfile } from './types';
import { stringify } from 'querystring';
import { generateRandomString, fetchJSON } from '../helpers';
export const useYandexRestAPI = (
  tokenGetter: () => Promise<OAuthTokenObject>
): RestAPI => {
  // if (token == null) {
  //   throw Error("Can't use API without auth token");
  // }
  const BASE_API = 'https://api.music.yandex.net';
  const PASSPORT_API = 'https://login.yandex.ru';
  const GET = async <T>(
    endpoint: string,
    baseApi: string = BASE_API
  ): Promise<T> => {
    const token = await tokenGetter();
    const resp = await fetchJSON(`${baseApi}/${endpoint}`, {
      method: 'GET',
      headers: {
        Authorization: `OAuth ${token.access_token}`,
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
export default (): AuthAPI => {
  const clientId = import.meta.env.VITE_YANDEX_CLIENT_ID;
  const clientSecret = import.meta.env.VITE_YANDEX_CLIENT_SECRET;
  const redirectUri = import.meta.env.VITE_YANDEX_REDIRECT_URI;
  return {
    async requestToken(code: string): Promise<OAuthTokenObject> {
      const resp = await fetchJSON('https://oauth.yandex.com/token', {
        method: 'POST',
        headers: {
          'Content-type': 'application/x-www-form-urlencoded',
        },
        body: stringify({
          client_id: clientId,
          client_secret: clientSecret,
          grant_type: 'authorization_code',
          code,
        }),
      });
      return resp as OAuthTokenObject;
    },
    async requestOAuthScreenUrl(): Promise<string> {
      const state = generateRandomString(16);
      const resp = await fetch(
        'https://oauth.yandex.com/authorize?' +
          stringify({
            response_type: 'code',
            client_id: clientId,
            scope: [
              'login:birthday',
              'login:email',
              'login:info',
              'login:avatar',
            ],
            state: state,
            redirect_uri: redirectUri,
          })
      );
      return resp.url;
    },
  };
};

import { AuthAPI, OAuthError, OAuthTokenObject } from '../types';
import { stringify } from 'querystring';
import { generateRandomString } from '../helpers';
import fetch from 'node-fetch';

export default (): AuthAPI => {
  const clientId = process.env.VITE_YANDEX_CLIENT_ID;
  const clientSecret = process.env.VITE_YANDEX_CLIENT_SECRET;
  const redirectUri = process.env.VITE_YANDEX_REDIRECT_URI;
  return {
    async refreshToken(
      refreshToken: string
    ): Promise<OAuthTokenObject | OAuthError> {
      return new Promise(async (resolve, reject) => {
        const resp = await fetch('https://oauth.yandex.com/token', {
          method: 'POST',
          headers: {
            'Content-type': 'application/x-www-form-urlencoded',
          },
          body: new URLSearchParams({
            client_id: clientId ?? '',
            client_secret: clientSecret ?? '',
            grant_type: 'refresh_token',
            refresh_token: refreshToken,
          }).toString(),
        });
        if (resp.ok) {
          resolve((await resp.json()) as OAuthTokenObject);
        } else {
          reject({ message: await JSON.stringify(resp.json()) } as OAuthError);
        }
      });
    },
    async requestToken(code: string): Promise<OAuthTokenObject | OAuthError> {
      return new Promise(async (resolve, reject) => {
        const resp = await fetch('https://oauth.yandex.com/token', {
          method: 'POST',
          headers: {
            'Content-type': 'application/x-www-form-urlencoded',
          },
          body: new URLSearchParams({
            client_id: clientId ?? '',
            client_secret: clientSecret ?? '',
            grant_type: 'authorization_code',
            code,
          }).toString(),
        });
        if (resp.ok) {
          resolve((await resp.json()) as OAuthTokenObject);
        } else {
          reject({ message: await JSON.stringify(resp.json()) } as OAuthError);
        }
      });
    },
    async getOAuthURL(): Promise<string> {
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

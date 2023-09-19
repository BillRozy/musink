import { AuthAPI, OAuthError, OAuthTokenObject } from '../types';
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
            grant_type: 'token',
            access_token: code,
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
      const resp = await fetch(
        'https://oauth.yandex.com/authorize?' +
          new URLSearchParams({
            response_type: 'token',
            client_id: clientId ?? '',
            redirect_uri: redirectUri ?? '',
            force_confirm: 'False',
            language: 'en',
          }).toString()
      );
      console.log(resp);
      return resp.url;
    },
  };
};

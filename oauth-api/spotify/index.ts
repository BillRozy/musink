import { AuthAPI, OAuthError, OAuthTokenObject } from '../types';
import { generateRandomString } from '../helpers';
import fetch from 'node-fetch';

export default () => {
  const clientId = process.env.VITE_SPOTIFY_CLIENT_ID;
  const clientSecret = process.env.VITE_SPOTIFY_CLIENT_SECRET;
  const redirectUri = process.env.VITE_SPOTIFY_REDIRECT_URI;
  return {
    async refreshToken(
      refreshToken: string
    ): Promise<OAuthTokenObject | OAuthError> {
      return new Promise(async (resolve, reject) => {
        const resp = await fetch('https://accounts.spotify.com/api/token', {
          method: 'POST',
          headers: {
            'Content-type': 'application/x-www-form-urlencoded',
            Authorization:
              'Basic ' +
              Buffer.from(clientId + ':' + clientSecret).toString('base64'),
          },
          body: new URLSearchParams({
            grant_type: 'refresh_token',
            refresh_token: refreshToken,
            redirect_uri: redirectUri ?? '',
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
        const resp = await fetch('https://accounts.spotify.com/api/token', {
          method: 'POST',
          headers: {
            'Content-type': 'application/x-www-form-urlencoded',
            Authorization:
              'Basic ' +
              Buffer.from(clientId + ':' + clientSecret).toString('base64'),
          },
          body: new URLSearchParams({
            grant_type: 'authorization_code',
            code,
            redirect_uri: redirectUri ?? '',
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
        'https://accounts.spotify.com/authorize?' +
          new URLSearchParams({
            response_type: 'code',
            client_id: clientId ?? '',
            scope: 'user-read-private user-read-email user-library-read',
            state: state,
            redirect_uri: redirectUri ?? '',
          }).toString()
      );
      return resp.url;
    },
  } as AuthAPI;
};

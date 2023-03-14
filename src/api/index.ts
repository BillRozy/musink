import { stringify } from 'querystring';
import { BrowserWindow, getCurrentWindow } from '@electron/remote';
const generateRandomString = (length: number) => {
  let text = '';
  const possible =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  for (let i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
};

export const useYandexAPI = () => {
  const stateKey = 'spotify_auth_state';
  const clientId = '0148cf4521d84509b1cc3b345a0c489f';
  const clientSecret = '9ffcbd390df242cd9783e3380e0fd3ec';
  const redirectUri = 'https://oauth.yandex.com/verification_code';
  return {
    async requestToken(code: string) {
      const resp = await fetch('https://oauth.yandex.com/token', {
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
      console.log(await resp.json());
    },
    async startLogin() {
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
            redirectUri,
          })
      );
      window.musinkAPI.sendToMainProcess('oauth-modal', resp.url);
    },
  };
};

export const useSpotifyAPI = () => {
  const stateKey = 'spotify_auth_state';
  const clientId = '854e1398a9f040d181f033718682da65';
  const clientSecret = 'b51b5314c32f45dd9607254a302ef9ac';
  const redirectUri = 'localhost:8000';
  return {
    async startLogin() {
      const state = generateRandomString(16);
      const scope = 'user-read-private user-read-email';
      return fetch(
        'https://accounts.spotify.com/authorize?' +
          stringify({
            response_type: 'code',
            client_id: clientId,
            scope: scope,
            state: state,
          })
      );
    },
  };
};

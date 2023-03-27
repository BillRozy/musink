import { RestAPI } from '../types';
import { OAuthTokenObject } from '../types';
import { stringify } from 'querystring';
import { generateRandomString, fetchJSON, fetchURL } from '../helpers';
import { SpotifyUserProfile } from './types';
export const useSpotifyRestAPI = (token: OAuthTokenObject | null): RestAPI => {
  if (token == null) {
    throw Error("Can't use API without auth token");
  }
  const BASE_API = 'https://api.spotify.com/v1';
  const GET = async <T>(endpoint: string): Promise<T> => {
    const resp = await fetchJSON(`${BASE_API}/${endpoint}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token.access_token}`,
        'Content-Type': 'application/json',
      },
    });
    return resp as T;
  };
  return {
    async getCurrentUser() {
      const resp = await GET<SpotifyUserProfile>('me');
      return {
        name: resp.display_name,
        email: resp.email,
        id: resp.id,
        serviceURL: resp.href,
        imageURL: resp.images[0]?.url,
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
export default () => {
  const clientId = import.meta.env.VITE_SPOTIFY_CLIENT_ID;
  const clientSecret = import.meta.env.VITE_SPOTIFY_CLIENT_SECRET;
  const redirectUri = import.meta.env.VITE_SPOTIFY_REDIRECT_URI;
  return {
    async requestToken(code: string) {
      console.log(code);
      const resp = await fetchJSON('https://accounts.spotify.com/api/token', {
        method: 'POST',
        headers: {
          'Content-type': 'application/x-www-form-urlencoded',
          Authorization: 'Basic ' + btoa(clientId + ':' + clientSecret),
        },
        body: stringify({
          grant_type: 'authorization_code',
          code,
          redirect_uri: redirectUri,
        }),
      });
      globalThis.musinkAPI.sendToMainProcess('spotify-oauth-token', resp);
    },
    async startLogin(): Promise<OAuthTokenObject> {
      const state = generateRandomString(16);
      const resp = await fetchURL(
        'https://accounts.spotify.com/authorize?' +
          stringify({
            response_type: 'code',
            client_id: clientId,
            scope: 'user-read-private user-read-email',
            state: state,
            redirect_uri: redirectUri,
          })
      );
      return globalThis.musinkAPI.invokeInMainProcess(
        'spotify-oauth-get-token',
        resp
      ) as Promise<OAuthTokenObject>;
    },
  };
};

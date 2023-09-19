import { RestAPI } from '../types';
import { fetch } from '../helpers';
import { FavoriteTracksResponse, UserProfile } from './types';
import { useProviderStore } from 'src/stores';
import { storeToRefs } from 'pinia';
import avatar from 'assets/pngtree-cat-default-avatar-image.jpg';
import { trackConverter } from './converters';

export default (): RestAPI => {
  const store = useProviderStore('spotify');
  const { token } = storeToRefs(store);
  const BASE_API = 'https://api.spotify.com/v1/';
  const GET = async <T>(endpoint: string): Promise<T> => {
    await store.checkOrRefreshToken();
    const resp = await fetch(`${BASE_API}${endpoint}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token?.value?.access_token}`,
        'Content-Type': 'application/json',
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
  return {
    async getCurrentUser() {
      const resp = await GET<UserProfile>('me');
      return {
        name: resp.display_name ?? '',
        email: resp.email,
        id: resp.id,
        serviceURL: resp.href,
        imageURL:
          resp.images && resp.images.length > 0 ? resp.images[0].url : avatar,
      };
    },
    async getFavoriteTracks() {
      let resp = await GET<FavoriteTracksResponse>(
        'me/tracks?offset=0&limit=50'
      );
      // loop and get all tracks
      let tracks = [...resp.items];
      while (resp.next) {
        resp = await GET<FavoriteTracksResponse>(resp.next.split(BASE_API)[1]);
        tracks = [...tracks, ...resp.items];
      }
      return tracks.map(trackConverter);
    },
  };
};

import { RestAPI } from '../types';
import { fetchJSON } from '../helpers';
import { FavoriteTracksResponse, UserProfile } from './types';
import { useProviderStore } from 'src/stores';
import { storeToRefs } from 'pinia';
import avatar from 'assets/pngtree-cat-default-avatar-image.jpg';

export default (): RestAPI => {
  const store = useProviderStore('spotify');
  const { token } = storeToRefs(store);
  const BASE_API = 'https://api.spotify.com/v1';
  const GET = async <T>(endpoint: string): Promise<T> => {
    await store.checkOrRefreshToken();
    const resp = await fetchJSON(`${BASE_API}/${endpoint}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token?.value?.access_token}`,
        'Content-Type': 'application/json',
      },
    });
    return resp as T;
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
      const resp = await GET<FavoriteTracksResponse>('me/tracks');
      console.log(resp);
      return resp.items.map((item) => ({
        name: item.track.name,
        id: item.track.id,
      }));
    },
  };
};

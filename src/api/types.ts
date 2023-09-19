import { Track, UserProfile } from 'src/types/models';

export interface RestAPI {
  getCurrentUser: () => Promise<UserProfile>;
  getFavoriteTracks: (userInfo?: UserProfile) => Promise<Track[]>;
}

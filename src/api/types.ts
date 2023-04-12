export type UserProfile = {
  name: string;
  email: string;
  id: string;
  serviceURL: string;
  imageURL?: string;
};

export type Track = {
  name: string;
  id: string;
};

export interface RestAPI {
  getCurrentUser: () => Promise<UserProfile>;
  getFavoriteTracks: () => Promise<Track[]>;
}

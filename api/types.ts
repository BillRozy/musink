export type OAuthTokenObject = {
  access_token: string;
  refresh_token: string;
};

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

export interface AuthAPI {
  requestToken: (code: string) => Promise<OAuthTokenObject>;
  requestOAuthScreenUrl: () => Promise<string>;
}

import 'spotify-api';

export type UserProfile = SpotifyApi.UserObjectPrivate &
  SpotifyApi.UserObjectPublic;

export type FavoriteTracksResponse = SpotifyApi.UsersSavedTracksResponse;

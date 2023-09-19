import 'spotify-api';

export type UserProfile = SpotifyApi.UserObjectPrivate &
  SpotifyApi.UserObjectPublic;

export type FavoriteTracksResponse = SpotifyApi.UsersSavedTracksResponse;
export type SpotifyAlbum = SpotifyApi.AlbumObjectSimplified;
export type SpotifyArtist = SpotifyApi.ArtistObjectSimplified;
export type SpotifySavedTrack = SpotifyApi.SavedTrackObject;

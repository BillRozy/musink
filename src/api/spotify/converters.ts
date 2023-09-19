import { Track, Artist, Album } from 'src/types/models';
import { SpotifyAlbum, SpotifyArtist, SpotifySavedTrack } from './types';

const dateConverter = (spDate: string): Date => {
  return new Date(spDate);
};

const artistConverter = (spArtist: SpotifyArtist): Artist => {
  return {
    id: spArtist.id,
    title: spArtist.name,
  };
};

const albumConverter = (spAlbum: SpotifyAlbum): Album => {
  return {
    id: spAlbum.id,
    title: spAlbum.name,
    artist: spAlbum.artists.map(artistConverter),
    date: dateConverter(spAlbum.release_date),
    images: spAlbum.images,
  };
};

export const trackConverter = (spTrack: SpotifySavedTrack): Track => {
  return {
    id: spTrack.track.id,
    title: spTrack.track.name,
    artist: spTrack.track.artists.map(artistConverter),
    album: albumConverter(spTrack.track.album),
    duration: spTrack.track.duration_ms,
  };
};

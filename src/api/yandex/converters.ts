import { Track, Artist, Album } from 'src/types/models';
import { YandexAlbumFull, YandexArtistFull, YandexTrackFull } from './types';

const dateConverter = (spDate: string): Date => {
  return new Date(spDate);
};

const artistConverter = (artist: YandexArtistFull): Artist => {
  return {
    id: artist.id,
    title: artist.name,
  };
};

const albumConverter = (album: YandexAlbumFull): Album => {
  return {
    id: `${album.id}`,
    title: album.title,
    artist: album.artists.map(artistConverter),
    date: dateConverter(album.releaseDate),
    images: [
      {
        url: album.coverUri,
      },
    ],
  };
};

export const trackConverter = (track: YandexTrackFull): Track => {
  return {
    id: track.id,
    title: track.title,
    artist: track.artists.map(artistConverter),
    album: track.albums.map(albumConverter)[0],
    duration: 0,
  };
};

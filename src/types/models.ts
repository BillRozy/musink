type Image = {
  url: string;
};

export type UserProfile = {
  name: string;
  email: string;
  id: string;
  serviceURL: string;
  image?: Image;
};

export type Artist = {
  id: string;
  title: string;
};

export type Album = {
  id: string;
  title: string;
  artist: Artist[];
  date: Date;
  images: Image[];
};

export type Track = {
  id: string;
  title: string;
  artist: Artist[];
  album: Album;
  duration: number;
  image?: Image;
  date?: Date;
};

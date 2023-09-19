type PassportPhone = {
  id: number;
  number: string;
};

export type YandexArtistFull = {
  composer: boolean;
  cover: {
    custom: boolean;
    dir: string;
    type: 'pic';
    itemsUri: string[];
    uri: string;
    version: string;
    error: string;
  };
  id: string;
  name: string;
  various: boolean;
  ticketsAvailable: boolean;
  regions: string[];
};

export type YandexAlbumFull = {
  id: number;
  error: string;
  title: string;
  type: string;
  metaType: string;
  year: number;
  releaseDate: string;
  coverUri: string;
  ogImage: string;
  genre: string;
  trackCount: number;
  recent: boolean;
  veryImportant: boolean;
  artists: YandexArtistFull[];
  labels: {
    id: number;
    name: string;
  }[];
  available: boolean;
  availableForPremiumUsers: boolean;
  availableForMobile: boolean;
  availablePartially: boolean;
};

export type YandexTrackFull = {
  albums: YandexAlbumFull[];
  artists: YandexArtistFull[];
  available: boolean;
  availableForPremiumUsers: boolean;
  availableFullWithoutPermission: boolean;
  coverUri: string;
  durationMs: number;
  fileSize: number;
  id: string;
  lyricsAvailable: boolean;
  major: {
    id: number;
    name: string;
  };
  normalization: {
    gain: number;
    peak: number;
  };
  ogImage: string;
  previewDurationMs: number;
  realId: string;
  rememberPosition: boolean;
  storageDir: string;
  title: string;
  type: string;
};

export type StupidYandexResponse<T> = {
  invocationInfo: {
    hostname: string;
    'req-id': string;
    'exec-duration-millis': string;
  };
  result: T;
};

export type YandexMusicAccount = {
  now: string;
  uid: number;
  login: string;
  region: number;
  fullName: string;
  secondName: string;
  firstName: string;
  displayName: string;
  serviceAvailable: boolean;
  hostedUser: boolean;
  'passport-phones': PassportPhone[];
  registeredAt: string;
  child: boolean;
  nonOwnerFamilyMember: boolean;
};

export type YandexAccountStatus = {
  account: YandexMusicAccount;
  defaultEmail: string;
};

export type YandexUserProfile = {
  id: string;
  login: string;
  client_id: string;
  display_name: string;
  real_name: string;
  first_name: string;
  last_name: string;
  default_email: string;
  emails: string[];
  birthday: string;
  default_avatar_id: string;
  is_avatar_empty: boolean;
  default_phone: PassportPhone;
  psuid: string;
};

export type YandexTrack = {
  id: string;
  albumId: string;
  timestamp: string;
};

export type FavoriteTracksResponseData = {
  library: {
    uid: number;
    revisions: number;
    tracks: YandexTrack[];
  };
};

export type TracksResponseData = YandexTrackFull[];

export type TracksRequestData = {
  'track-ids': string[];
  'with-positions'?: boolean;
};

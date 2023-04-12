type PassportPhone = {
  id: number;
  number: string;
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

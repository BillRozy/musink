export type OAuthTokenObject = {
  access_token: string;
  refresh_token: string;
  expires_in: number;
};

export type OAuthError = {
  message: string;
};

export interface AuthAPI {
  requestToken: (code: string) => Promise<OAuthTokenObject | OAuthError>;
  refreshToken: (
    refreshToken: string
  ) => Promise<OAuthTokenObject | OAuthError>;
  getOAuthURL: () => Promise<string>;
}

export interface RefreshTokenWithSalt {
  refreshToken: string;
  salt: string;
}

export interface LoginWithRefreshTokenResponse extends RefreshTokenWithSalt {
  token: string;
}

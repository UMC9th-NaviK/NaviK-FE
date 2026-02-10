export type UserStatus = 'PENDING' | 'ACTIVE';

export interface RefreshTokenResponse {
  accessToken: string;
  status: UserStatus;
}

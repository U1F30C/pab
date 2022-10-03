export enum LoggedInReason {
  noToken,
  expiredToken,
  noReason,
}
export interface IsLoggedInResult {
  isLoggedIn: boolean;
  reason: LoggedInReason;
}

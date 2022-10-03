import { LoginWithRefreshTokenResponse } from "../model/login-api-response";
import { httpClientNoAuth } from "../utils/http";
import { authenticationService } from "./authentication-service";
import { IsLoggedInResult, LoggedInReason } from "../model/is-logged-in-result";

export class RefreshTokenService {
  constructor() {}

  private async _refresh(): Promise<boolean> {
    try {
      var refreshTokenWithSalt = authenticationService.getRefreshToken();
      var axiosResponse =
        await httpClientNoAuth.post<LoginWithRefreshTokenResponse>(
          "login/refresh-token",
          {
            refreshToken: refreshTokenWithSalt.refreshToken,
            salt: refreshTokenWithSalt.salt,
          }
        );
      this.saveToken(axiosResponse.data);
      return true;
    } catch (exception) {
      throw exception;
    }
  }

  async handleNoLoggedIn(isLoggedInResult: IsLoggedInResult) {
    if (isLoggedInResult.reason == LoggedInReason.noToken) {
      return false;
    } else {
      var refreshTokenResult = await this._refresh();
      return refreshTokenResult;
    }
  }

  private saveToken(
    loginWithRefreshTokenResponse: LoginWithRefreshTokenResponse
  ) {
    authenticationService.saveToken(loginWithRefreshTokenResponse);
  }
}

export const refreshTokenService = new RefreshTokenService();

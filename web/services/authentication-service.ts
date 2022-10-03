import axios, { AxiosInstance } from "axios";
import jwt_decode from "jwt-decode";
import { IsLoggedInResult, LoggedInReason } from "../model/is-logged-in-result";
import { LoginModel } from "../model/login-model";
import { SessionUser } from "../model/session-user";
import { User } from "../model/user";
import { createAxiosInstance, httpClient } from "../utils/http";
import { jwtService } from "./jwt-service";
import { storageManager } from "./storer";
import { isBefore } from "date-fns";
import { now } from "../utils/time-utils";
import {
  LoginWithRefreshTokenResponse,
  RefreshTokenWithSalt,
} from "../model/login-api-response";
import { refreshTokenService } from "./refresh-token-service";

const saltKey = "SALT";
const refreshTokenKey = "REFRESH_TOKEN";

class AuthenticationService {
  private httpInstance: AxiosInstance;
  private _user: SessionUser;
  constructor() {
    this.httpInstance = createAxiosInstance(process.env.NEXT_PUBLIC_API_ORIGIN);
  }
  async authenticate(loginData: LoginModel) {
    try {
      const response =
        await this.httpInstance.post<LoginWithRefreshTokenResponse>(
          "login/with-refresh",
          undefined,
          {
            headers: {
              Authorization:
                "Basic " + btoa(`${loginData.email}:${loginData.password}`),
            },
          }
        );
      this.saveToken(response.data);
      this.loadUser();
    } catch (error: any) {
      if (axios.isAxiosError(error)) {
        throw error.response.data;
      }
      throw error;
    }
  }
  get user(): SessionUser {
    return this._user;
  }

  isLoggedIn(): IsLoggedInResult {
    let result: string = storageManager.getToken();
    if (!result) {
      return {
        isLoggedIn: false,
        reason: LoggedInReason.noToken,
      };
    }
    var expirationDate = jwtService.getExpDate(result);
    if (expirationDate == null) {
      return {
        isLoggedIn: false,
        reason: LoggedInReason.noToken,
      };
    } else {
      try {
        var isExpired = this.isTokenExpired();
        if (isExpired) {
          return {
            isLoggedIn: false,
            reason: LoggedInReason.expiredToken,
          };
        }
      } catch (error) {
        return {
          isLoggedIn: false,
          reason: LoggedInReason.noToken,
        };
      }
    }
    return {
      isLoggedIn: true,
      reason: LoggedInReason.noReason,
    };
  }

  private isTokenExpired(): boolean {
    var token = storageManager.getToken();
    if (!token) {
      throw Error();
    }
    var expirationDate = jwtService.getExpDate(token);
    if (expirationDate == null) {
      throw Error();
    }
    return isBefore(expirationDate, now());
  }

  logOff() {
    storageManager.removeToken();
  }

  private async checkTokenValidity() {
    try {
      await httpClient.get("verify-access-token");
      return true;
    } catch (error) {
      if (error) {
        return false;
      }
    }
  }

  private loadUser() {
    const token = storageManager.getToken();
    let user = this.parseToken(token);
    this._user = user;
  }

  private parseToken(token: string) {
    let user = <User>jwt_decode(token);
    return user;
  }

  saveToken(loginResponse: LoginWithRefreshTokenResponse) {
    storageManager.saveToken(loginResponse.token);
    storageManager.save(refreshTokenKey, loginResponse.refreshToken);
    storageManager.save(saltKey, loginResponse.salt);
  }

  getRefreshToken(): RefreshTokenWithSalt {
    let refreshToken: string = storageManager.get(refreshTokenKey);
    let salt: string = storageManager.get(saltKey);
    if (!refreshToken || !salt) {
      throw Error();
    }
    return {
      refreshToken: refreshToken,
      salt: salt,
    };
  }

  async ensureToken(): Promise<boolean> {
    var isLoggedInResult = await authenticationService.isLoggedIn();
    if (isLoggedInResult.isLoggedIn) {
      this.loadUser();
      return true;
    } else {
      let result = await refreshTokenService.handleNoLoggedIn(isLoggedInResult);
      if (result) {
        this.loadUser();
      }
      return result;
    }
  }
}

export const authenticationService = new AuthenticationService();

import axios from "axios";
import { authenticationService } from "../services/authentication-service";
import { storageManager } from "../services/storer";

function createInstanceWithAuthInterceptor(baseURL: string) {
  const instance = createAxiosInstance(baseURL);
  instance.interceptors.request.use(async function (config) {
    let result = await authenticationService.ensureToken();
    if (result) {
      let token = storageManager.getToken();
      if (token) {
        config.headers["Authorization"] = `Bearer ${token}`;
      }
    }
    return config;
  });
  return instance;
}
export function createAxiosInstance(baseURL: string) {
  let instance = axios.create({
    baseURL: baseURL,
    timeout: 5000,
  });
  return instance;
}

export const httpClient = createInstanceWithAuthInterceptor(
  process.env.NEXT_PUBLIC_API_ORIGIN
);
export const httpClientNoAuth = createAxiosInstance(
  process.env.NEXT_PUBLIC_API_ORIGIN
);

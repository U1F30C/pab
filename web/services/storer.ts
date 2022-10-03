import { noop, stubString } from "lodash";

const JWT_TOKEN_KEY = "JWT_TOKEN_KEY";

class StorageManager {
  get localStorage(): Storage {
    let localStorage: Storage;
    if (typeof window !== "undefined") {
      localStorage = window.localStorage;
    } else {
      localStorage = {
        length: 0,
        get: noop,
        setItem: noop,
        clear: noop,
        getItem: stubString,
        removeItem: noop,
        key: stubString,
      };
    }
    return localStorage;
  }
  constructor() {}
  saveToken(token: string) {
    this.save(JWT_TOKEN_KEY, token);
  }
  getToken(): string {
    return this.get(JWT_TOKEN_KEY);
  }
  removeToken() {
    this.remove(JWT_TOKEN_KEY);
  }

  save(key: string, value: string) {
    this.localStorage?.setItem(key, value);
  }

  get(key: string, defaultValue?: string) {
    let result = this.localStorage?.getItem(key);
    if (!result) {
      result = defaultValue;
    }
    return result;
  }

  remove(key: string) {
    this.localStorage?.removeItem(key);
  }
}

export const storageManager = new StorageManager();

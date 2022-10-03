import axios from "axios";
import { User } from "../model/user";
import { httpClient } from "../utils/http";
import { PaginatedElements } from "../utils/querying/paginated-elements";
import { ApiQuery, apiQueryToOdataParams } from "../utils/querying/api-query";

class UserService {
  constructor() {}
  async create(user: User) {
    delete user.id;
    try {
      const createdUser = await httpClient.post<Partial<User>>("users", user);
      await this.sendVerificationEmail(createdUser.data.id);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw error.response.data;
      }
      throw error;
    }
  }

  async getAll(query: ApiQuery) {
    try {
      let params = apiQueryToOdataParams(query);
      if (query.queryString) {
        params.$filter = `substringof('${query.queryString.toLowerCase()}', tolower(fullName)) or substringof('${query.queryString}', email)`;
      }
      const response = await httpClient.get<PaginatedElements<User>>("users", {
        params: params,
      });
      return response.data;
    } catch (error) {
      return null;
    }
  }

  async update(userId: number, user: User) {
    try {
      await httpClient.patch("users/" + userId, user);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw error.response.data;
      }
      throw error;
    }
  }

  async get(userId) {
    try {
      const response = await httpClient.get<User>("users/" + userId);
      return response.data;
    } catch (error) {}
  }

  sendVerificationEmail(userId: number) {
    return httpClient.post("users/send-verification/" + userId);
  }

  recoverPassword(email: string) {
    return httpClient.post("users/recover-password/", { email });
  }

  async validateVerificationToken(token: string): Promise<boolean> {
    const response = await httpClient.get(`users/validate-token/${token}`);
    return response.data.isValid;
  }

  setPassword(token: string, password: string) {
    return httpClient.post(`users/set-password`, {
      token,
      password,
    });
  }
}

export const userService = new UserService();

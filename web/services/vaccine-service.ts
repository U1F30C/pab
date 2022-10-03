import axios from "axios";
import { Vaccine } from "../model/vaccine";
import { httpClient } from "../utils/http";
import { PaginatedElements } from "../utils/querying/paginated-elements";
import { ApiQuery, apiQueryToOdataParams } from "../utils/querying/api-query";

class VaccineService {
  constructor() {}
  async create(vaccine: Vaccine) {
    delete vaccine.id;
    try {
      const createdVaccine = await httpClient.post<Partial<Vaccine>>("vaccines", vaccine);
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
        params.$filter = `substringof('${query.queryString.toLowerCase()}', tolower(nombre_vacuna))`;
      }
      const response = await httpClient.get<PaginatedElements<Vaccine>>("vaccines", {
        params: params,
      });
      return response.data;
    } catch (error) {
      return null;
    }
  }

  async update(vaccineId: number, vaccine: Vaccine) {
    try {
      await httpClient.patch("vaccines/" + vaccineId, vaccine);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw error.response.data;
      }
      throw error;
    }
  }

  async get(vaccineId) {
    try {
      const response = await httpClient.get<Vaccine>("vaccines/" + vaccineId);
      return response.data;
    } catch (error) {}
  }
}

export const vaccineService = new VaccineService();

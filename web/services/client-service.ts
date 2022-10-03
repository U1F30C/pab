import { Client } from '../model/client';
import { httpClient } from '../utils/http';
import { ApiQuery } from '../utils/querying/api-query';

export class ClientService {
  async findById(clientId: number): Promise<Client> {
    try {
      const response = await httpClient.get<Client>(`clients/${clientId}`, {});
      return response.data;
    } catch (error) {
      return null;
    }
  }

  async getAll(query: ApiQuery) {
    try {
      const normalizedQueryString = (query.queryString || '').toLowerCase();
      const response = await httpClient.get<{ data: Client[]; count: number }>(
        'clients',
        {
          params: {
            $skip: query.pageIndex * query.pageSize,
            $top: query.pageSize,
            $filter: `substringof('${normalizedQueryString}', email) or substringof('${normalizedQueryString}', tolower(nombre))`,
          },
        },
      );
      return response.data;
    } catch (error) {
      return null;
    }
  }
}
export const clientService = new ClientService();

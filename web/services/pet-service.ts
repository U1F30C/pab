import axios from 'axios';
import { Pet } from '../model/pet';
import { httpClient } from '../utils/http';
import { PaginatedElements } from '../utils/querying/paginated-elements';
import { ApiQuery, apiQueryToOdataParams } from '../utils/querying/api-query';

class PetService {
  constructor() {}
  async create(pet: Pet) {
    delete pet.id;
    try {
      const createdPet = await httpClient.post<Partial<Pet>>('pets', pet);
      // await this.sendVerificationEmail(createdPet.data.id);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw error.response.data;
      }
      throw error;
    }
  }

  async getAll(query: ApiQuery) {
    // {
    //     "name":"Balto",
    //     "description":"Un perrito jugetón",
    //     "species":"Firulais",
    //     "description":"Firulais",
    //     "image":"http://localhost:3000/images/demo/1.jpg",
    //     "sex":"Male",
    //     "state":"Active"
    //   }
      
      // Felix, Tom, Balto, Bolt
      //http://placekitten.com/200/200?image=10
    try {
      let params = apiQueryToOdataParams(query);
      if (query.queryString) {
        params.$filter = `substringof('${query.queryString.toLowerCase()}', tolower(nombre))`;
      }
      const response = await httpClient.get<PaginatedElements<Pet>>('pets', {
        params: params,
      });
      return response.data;
    } catch (error) {
      return null;
    }
  }

  async update(petId: number, pet: Pet) {
    try {
      await httpClient.patch('pets/' + petId, pet);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw error.response.data;
      }
      throw error;
    }
  }

  async get(petId) {
    try {
      const response = await httpClient.get<Pet>('pets/' + petId);
      return response.data;
    } catch (error) {}
  }
}

export const petService = new PetService();

import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { VaccinesController } from './vaccines/vaccines.controller';
import { VaccinesService } from './vaccines/vaccines.service';
import { Vaccine } from './models/vaccine.model';
import { ClientsService } from './clients/clients.service';
import { PetsService } from './pets/pets.service';
import { PetsController } from './pets/pets.controller';
import { ClientsController } from './clients/clients.controller';
import { Pet } from './models/pet.model';
import { Client } from './models/client.model';

@Module({
  imports: [SequelizeModule.forFeature([Vaccine, Pet, Client])],
  providers: [VaccinesService, PetsService, ClientsService],
  controllers: [VaccinesController, PetsController, ClientsController],
})
export class PetsModule {}

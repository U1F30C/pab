import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  UsePipes
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { ValidationWhitelistPipe } from 'src/shared/pipes/validation-pipe';
import { PaginationWrapper } from 'src/shared/querying/querist';
import {
  Pet,
  PetRequestBody
} from '../models/pet.model';
import { PetsService } from './pets.service';

@ApiTags('Pet management')
@ApiBearerAuth()
@Controller('pets')
export class PetsController {
  constructor(private petsService: PetsService) {}
  @Get()
  async findAll(@Query() query): Promise<PaginationWrapper<Pet>> {
    return this.petsService.findAll(query);
  }

  @Get(':id(\\d+)')
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<Pet> {
    return this.petsService.findById(id);
  }

  @Post()
  @UsePipes(ValidationWhitelistPipe())
  async create(
    @Body() pet: PetRequestBody,
  ): Promise<PetRequestBody> {
    const createdPet = await this.petsService.insert(
      pet,
    );
    return createdPet;
  }

  @Patch(':id(\\d+)')
  @UsePipes(ValidationWhitelistPipe(['update']))
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() pet: Partial<PetRequestBody>,
  ) {
    const updateResult = this.petsService.update(id, pet);
    return updateResult;
  }
}

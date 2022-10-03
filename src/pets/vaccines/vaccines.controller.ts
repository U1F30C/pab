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
  Vaccine,
  VaccineRequestBody
} from '../models/vaccine.model';
import { VaccinesService } from './vaccines.service';

@ApiTags('Vaccine management')
@ApiBearerAuth()
@Controller('vaccines')
export class VaccinesController {
  constructor(private vaccinesService: VaccinesService) {}
  @Get()
  async findAll(@Query() query): Promise<PaginationWrapper<Vaccine>> {
    return this.vaccinesService.findAll(query);
  }

  @Get(':id(\\d+)')
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<Vaccine> {
    return this.vaccinesService.findById(id);
  }

  @Post()
  @UsePipes(ValidationWhitelistPipe())
  async create(
    @Body() vaccine: VaccineRequestBody,
  ): Promise<VaccineRequestBody> {
    const createdVaccine = await this.vaccinesService.insert(
      vaccine,
    );
    return createdVaccine;
  }

  @Patch(':id(\\d+)')
  @UsePipes(ValidationWhitelistPipe(['update']))
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() vaccine: Partial<VaccineRequestBody>,
  ) {
    const updateResult = this.vaccinesService.update(id, vaccine);
    return updateResult;
  }
}

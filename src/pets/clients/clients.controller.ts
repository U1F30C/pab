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
  Client,
  ClientRequestBody
} from '../models/client.model';
import { ClientsService } from './clients.service';

@ApiTags('Client management')
@ApiBearerAuth()
@Controller('clients')
export class ClientsController {
  constructor(private clientsService: ClientsService) {}
  @Get()
  async findAll(@Query() query): Promise<PaginationWrapper<Client>> {
    return this.clientsService.findAll(query);
  }

  @Get(':id(\\d+)')
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<Client> {
    return this.clientsService.findById(id);
  }

  @Post()
  @UsePipes(ValidationWhitelistPipe())
  async create(
    @Body() client: ClientRequestBody,
  ): Promise<ClientRequestBody> {
    const createdClient = await this.clientsService.insert(
      client,
    );
    return createdClient;
  }

  @Patch(':id(\\d+)')
  @UsePipes(ValidationWhitelistPipe(['update']))
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() client: Partial<ClientRequestBody>,
  ) {
    const updateResult = this.clientsService.update(id, client);
    return updateResult;
  }
}

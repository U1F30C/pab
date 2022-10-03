import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  UsePipes,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthorizeJWTRoleOverride } from 'src/authorization/decorators/authorize-jwt-permission';
import { Roles } from 'src/constants/roles';
import { ValidationWhitelistPipe } from 'src/shared/pipes/validation-pipe';
import { PaginationWrapper } from 'src/shared/querying/querist';
import { User, UserRequestBody } from './models/user.model';
import { UsersService } from './users.service';

@ApiTags('User management')
@ApiBearerAuth()
@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}
  @Get()
  async findAll(@Query() query): Promise<PaginationWrapper<User>> {
    return this.usersService.findAll(query);
  }

  @Get(':id(\\d+)')
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<User> {
    return this.usersService.findById(id);
  }

  @Post()
  @UsePipes(ValidationWhitelistPipe(['insert']))
  async create(@Body() user: UserRequestBody): Promise<UserRequestBody> {
    const createdUser = await this.usersService.insert(user);
    return createdUser;
  }

  @Patch(':id(\\d+)')
  @UsePipes(ValidationWhitelistPipe(['update']))
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() user: Partial<UserRequestBody>,
  ) {
    const updateResult = this.usersService.update(id, user);
    return updateResult;
  }
}

import {
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { ApiBasicAuth, ApiDefaultResponse, ApiTags } from '@nestjs/swagger';
import { Request as ExpressRequest } from 'express';
import { BasicAuthGuard } from 'src/authorization/guards/basic-auth.guard';
import { LoginViaRefreshTokenResult as LoginWithRefreshTokenResult } from '../dto/login-via-refresh-token-result';
import { AuthorizationService } from '../services/authorization.service';

@ApiTags('Authorization')
@ApiBasicAuth()
@UseGuards(BasicAuthGuard)
@Controller('login')
export class LoginController {
  constructor(private authorizationService: AuthorizationService) {}
  @ApiDefaultResponse({
    status: HttpStatus.OK,
    type: String,
    description:
      'Login based on Basic Authentication as specified on https://swagger.io/docs/specification/authentication/basic-authentication/. Returns token to be used for authorization.',
  })
  @HttpCode(HttpStatus.OK)
  @Post()
  login(@Request() req: ExpressRequest): string {
    return this.authorizationService.login(req.user);
  }
}

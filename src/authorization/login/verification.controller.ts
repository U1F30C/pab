import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';

@ApiTags('Authorization')
@ApiBearerAuth()
@ApiResponse({
  status: HttpStatus.OK,
  description: 'Endpoint to verify authorization token is still valid.',
})
@UseGuards(JwtAuthGuard)
@Controller('verify-access-token')
export class VerificationController {
  constructor() {}
  @Get('')
  @HttpCode(HttpStatus.OK)
  verifyAccessToken() {}
}

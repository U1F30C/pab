import { applyDecorators, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/authorization/guards/jwt-auth.guard';
import { Roles } from 'src/constants/roles';
import { RolesGuard } from '../guards/roles.guard';
import { UseRoles } from './roles.decorator';

export const AuthorizeJWTRoleOverride = (...roles: Roles[]) => {
  return applyDecorators(
    UseRoles(...roles),
    UseGuards(JwtAuthGuard),
    UseGuards(RolesGuard),
  );
};

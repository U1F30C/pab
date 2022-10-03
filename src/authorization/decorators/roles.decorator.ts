import { SetMetadata } from '@nestjs/common';
import { Roles } from 'src/constants/roles';

export function UseRoles(...roles: Roles[]) {
  return SetMetadata('roles', roles);
}

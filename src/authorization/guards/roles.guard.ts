import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { castArray, isEmpty } from 'lodash';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const controllerRoles = this.reflector.get<string[]>(
      'roles',
      context.getClass(),
    );
    const handlerRoles = this.reflector.get<string[]>(
      'roles',
      context.getHandler(),
    );
    const selectedRoles = handlerRoles || controllerRoles;
    if (isEmpty(selectedRoles)) {
      return true;
    }
    const rolesArray = castArray(selectedRoles);
    const request = context.switchToHttp().getRequest();
    const user = request.user;

    return rolesArray.includes(user.role);
  }
}

import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Roles_Key } from '../decorators/roles.decorator';
import { Role } from '../../common/enums/role.enum';

@Injectable()
export class RolesGuard implements CanActivate {

  constructor(private readonly reflector: Reflector ) {

  }

  canActivate(
    context: ExecutionContext,
  ): boolean /* | Promise<boolean> | Observable<boolean> */ {

    const role = this.reflector.getAllAndOverride<Role>(Roles_Key, [
      context.getHandler(),
      context.getClass()
    ]);

    if (!role) {
      return true;
    }

    //console.log(roles)

    const { user } = context.switchToHttp().getRequest() 

    if (user.role === Role.ADMIN) {
      return true
    }
    /* return true; */
    return role === user.role;
  }
}

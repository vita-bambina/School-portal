import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';

@Injectable()
export class RolesGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();

    const user = request.user;

    console.log('ROLES GUARD USER:', user);
    console.log('ROLES GUARD ROLE:', user?.role);

    return user.role === 'School_Admin';
  }
}

import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Observable } from "rxjs";


@Injectable()
export class RoleGaurd implements CanActivate {
  constructor(private reflector: Reflector) { }

  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const rolesFromHandler = this.reflector.get('roles', context.getHandler())
    // const rolesFromController = this.reflector.get('roles', context.getClass())

    const { user } = context.switchToHttp().getRequest();

    return rolesFromHandler.some((role: string) => role === user.role);
  }
}
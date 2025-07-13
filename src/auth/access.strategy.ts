import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { Injectable, UnauthorizedException } from "@nestjs/common";
import { AuthService } from "./auth.service";

@Injectable()
export class AccessStrategy extends PassportStrategy(Strategy) {
  constructor(public authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: '$$SECRETKEY$$',
    })
  }

  async validate(payload: any): Promise<unknown> {
    const isLoggedIn = await this.authService.checkLoggedIn(payload.id);

    if (!isLoggedIn) throw new UnauthorizedException('user has logged out!');

    return { id: payload.id, email: payload.email }
  }
}
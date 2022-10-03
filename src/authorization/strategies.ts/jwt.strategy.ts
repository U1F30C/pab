import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { appConfig } from 'src/utils/startup-config-service';
import { RequestUser } from '../request-user';
import { AuthorizationService } from '../services/authorization.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthorizationService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: appConfig.get('JWT_KEY'),
    });
  }

  async validate(payload: RequestUser) {
    return this.authService.authorizeViaJWT(payload);
  }
}

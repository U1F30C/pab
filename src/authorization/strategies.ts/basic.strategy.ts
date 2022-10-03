import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { BasicStrategy } from 'passport-http';
import { AuthorizationService } from '../services/authorization.service';

@Injectable()
export class BasicAuthStrategy extends PassportStrategy(BasicStrategy) {
  constructor(private authService: AuthorizationService) {
    super();
  }

  validate(email: string, password: string): Promise<any> {
    return this.authService.authorizeWithCredentials(email, password);
  }
}

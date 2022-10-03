import { Injectable } from '@nestjs/common';
import * as jsonWebToken from 'jsonwebtoken';

@Injectable()
export class JwtService {
  generateJwt(payload: any, exp: number, key: string) {
    let token = jsonWebToken.sign(payload, key, {
      expiresIn: exp,
    });
    return token;
  }

  validateJwt(token: string, key: string) {
    try {
      let result = jsonWebToken.verify(token, key, {
        ignoreExpiration: false,
      });
      return result;
    } catch {
      return null;
    }
  }
}

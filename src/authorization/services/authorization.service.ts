import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { compare } from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { isNil } from 'lodash';
import { APIError, ErrorReasons } from 'src/shared/enums/api-errors';
import { formatErrorReason } from 'src/shared/pipes/exception-factory';
import { User } from 'src/users/models/user.model';
import { UsersService } from 'src/users/users.service';
import { appConfig } from 'src/utils/startup-config-service';
import { LoginViaRefreshTokenResult } from '../dto/login-via-refresh-token-result';
import { RefreshTokenPayload } from '../dto/refresh-token-payload';
import { RefreshTokenWithSalt } from '../dto/refresh-token-result';
import { RequestUser } from '../request-user';

@Injectable()
export class AuthorizationService {
  constructor(
    private userService: UsersService,
  ) {}
  private async authorizeViaBasic(
    userResolver: () => Promise<User>,
    authenticationResolver: (user: User) => Promise<boolean>,
  ) {
    let user: User;
    try {
      user = await userResolver();
    } catch (exception) {
      if (exception instanceof NotFoundException)
        throw new NotFoundException(formatErrorReason(APIError.NotFound));
      else throw exception;
    }
    if (await authenticationResolver(user)) {
      if (!user.active) {
        throw new UnauthorizedException(
          formatErrorReason(ErrorReasons.InactiveUser),
        );
      }
      return user;
    } else {
      throw new UnauthorizedException(
        formatErrorReason(ErrorReasons.Unauthorized),
      );
    }
  }

  async authorizeWithCredentials(email: string, password: string) {
    return this.authorizeViaBasic(
      () => this.userService.findOneByEmail(email),
      async (user) => {
        if (isNil(user.password) || !compare(password, user.password)) {
          throw new UnauthorizedException(
            formatErrorReason(ErrorReasons.WrongPassword),
          );
        }
        return true;
      },
    );
  }

  async authorizeViaJWT(payload: RequestUser): Promise<RequestUser> {
    if ('id' in payload && !isNaN(parseInt(<any>payload.id, 10!))) {
      return {
        id: payload.id,
        name: payload.name,
        lastName: payload.lastName,
        role: payload.role,
        email: payload.email,
      };
    }
    throw new UnauthorizedException(formatErrorReason(ErrorReasons.Unknown));
  }

  login(user: RequestUser): string {
    const token = jwt.sign(
      {
        id: user.id,
        name: user.name,
        lastName: user.lastName,
        role: user.role,
        email: user.email,
      },
      appConfig.get('JWT_KEY'),
      {
        expiresIn: +appConfig.get('JWT_EXPIRATION_TIME', '3600'),
      },
    );
    return token;
  }
}

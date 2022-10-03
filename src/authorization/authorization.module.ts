import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UsersModule } from 'src/users/users.module';
import { appConfig } from 'src/utils/startup-config-service';
import { LoginController } from './login/login.controller';
import { VerificationController } from './login/verification.controller';
import { BasicAuthStrategy } from './strategies.ts/basic.strategy';
import { JwtStrategy } from './strategies.ts/jwt.strategy';
import { AuthorizationService } from './services/authorization.service';

@Module({
  controllers: [LoginController, VerificationController],
  imports: [
    PassportModule,
    JwtModule.register({
      secret: appConfig.get('JWT_KEY'),
    }),
    UsersModule,
  ],
  providers: [AuthorizationService, BasicAuthStrategy, JwtStrategy],
  exports: [JwtModule],
})
export class AuthorizationModule {}

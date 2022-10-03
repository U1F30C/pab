import { Module } from '@nestjs/common';
import { SequelizeModule, SequelizeModuleOptions } from '@nestjs/sequelize';
import { Dialect } from 'sequelize/types';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthorizationModule } from './authorization/authorization.module';
import { UsersModule } from './users/users.module';
import { appConfig } from './utils/startup-config-service';
import { stringToBoolean } from './utils/miscellaneous';
import { PetsModule } from './pets/pets.module';

const options: SequelizeModuleOptions = {
  dialect: <Dialect>appConfig.get('DB_CONNECTION', 'postgresql'),
  port: +appConfig.get('DB_PORT', '5432'),
  username: appConfig.get('DB_USER'),
  password: appConfig.get('DB_PASSWORD'),
  database: appConfig.get('DB_DATABASE'),
  host: appConfig.get('DB_HOST'),
  ssl: stringToBoolean(appConfig.get('DB_SSL', 'true')),
};

@Module({
  imports: [
    SequelizeModule.forRoot({
      ...options,
      autoLoadModels: true,
      synchronize: false,
    }),
    UsersModule,
    AuthorizationModule,
    PetsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

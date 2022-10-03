import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { VaccinesController } from './vaccines/vaccines.controller';
import { VaccinesService } from './vaccines/vaccines.service';
import { Vaccine } from './models/vaccine.model';

@Module({
  imports: [SequelizeModule.forFeature([Vaccine])],
  providers: [VaccinesService],
  controllers: [VaccinesController],
})
export class PetsModule {}

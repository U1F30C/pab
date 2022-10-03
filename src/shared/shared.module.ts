import { Global, Module } from '@nestjs/common';
import { BaseService } from './base/base.service';
import { Querist } from './querying/querist';

@Global()
@Module({
  imports: [Querist, BaseService],
  providers: [Querist],
  exports: [Querist, BaseService],
})
export class SharedModule {}

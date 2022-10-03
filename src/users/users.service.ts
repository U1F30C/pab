import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { set } from 'lodash';
import { Op } from 'sequelize';
import { ModelCtor } from 'sequelize-typescript';
import { BaseService } from 'src/shared/base/base.service';
import { ErrorReasons } from 'src/shared/enums/api-errors';
import { formatErrorReason } from 'src/shared/pipes/exception-factory';
import {
  OdataQueryParams,
  Querist,
  QueryCustomizer,
} from 'src/shared/querying/querist';
import { IUser, User, UserRequestBody } from './models/user.model';

@Injectable()
export class UsersService extends BaseService<User, UserRequestBody> {
  constructor(
    @InjectModel(User)
    userModel: ModelCtor<User>,
    querist: Querist<User>,
  ) {
    super(userModel, querist);
  }

  ommitPassword(options: Partial<QueryCustomizer>) {
    set(options, 'attributes.exclude', ['password']);
  }

  findById(id: number, customize?) {
    return super.findById(id, (options) => {
      customize && customize(options);
      this.ommitPassword(options);
    });
  }

  async findAll(query: OdataQueryParams, customize?: QueryCustomizer) {
    return super.findAll(query, (options, queryInterface) => {
      customize && customize(options, queryInterface);
      this.ommitPassword(options);
    });
  }

  private async validateDuplicate(
    user: Partial<UserRequestBody>,
    id: number = 0,
  ) {
    const isDuplicated = await this.set.count({
      where: {
        email: user.email,
        id: {
          [Op.ne]: id,
        },
      },
    });
    if (!!isDuplicated) {
      throw new BadRequestException(
        formatErrorReason(ErrorReasons.DuplicatedEmail),
      );
    }
  }

  async insert(newUser: UserRequestBody) {
    await this.validateDuplicate(newUser);
    return super.insert(newUser);
  }

  async update(userId: number, newData: Partial<UserRequestBody>) {
    await this.validateDuplicate(newData, userId);
    return super.update(userId, <IUser>newData);
  }

  async findOneByEmail(email: string) {
    const entity = await this.set.findOne({
      where: {
        email,
      },
    });
    if (!entity) {
      throw new NotFoundException();
    }
    return entity;
  }
}

import { genSalt, hash } from 'bcrypt';
import {
  IsBoolean,
  IsEmail,
  IsEnum,
  IsOptional,
  IsString,
} from 'class-validator';
import {
  BeforeSave,
  Column,
  DataType,
  HasOne,
  Model,
  Table,
} from 'sequelize-typescript';
import { Roles } from '../../constants/roles';
import { appConfig } from '../../utils/startup-config-service';
import { VerificationToken } from './verification-token.model';

export class UserRequestBody {
  @IsString({
    always: true,
  })
  @IsOptional({
    groups: ['update'],
  })
  name: string;
  @IsString({
    always: true,
  })
  @IsOptional({
    groups: ['update'],
  })
  lastName: string;
  @IsString({
    always: true,
  })
  @IsOptional({
    groups: ['update'],
  })
  @IsEmail(undefined, {
    always: true,
  })
  email: string;
  @IsString({
    always: true,
  })
  @IsOptional({
    groups: ['update'],
  })
  @IsEnum(Roles, {
    always: true,
  })
  role: Roles;
  @IsOptional({
    groups: ['update'],
  })
  @IsBoolean({
    always: true,
  })
  active: boolean;
}
export interface IUser {
  id: number;
  name: string;
  lastName: string;
  password: string;
  email: string;
  role: Roles;
  active: boolean;
}

@Table({
  modelName: 'user',
})
export class User extends Model<IUser, Omit<IUser, 'id'>> implements IUser {
  @Column({ primaryKey: true, autoIncrement: true })
  id: number;
  @Column
  name: string;
  @Column
  lastName: string;
  @Column({ type: DataType.STRING(510) })
  fullName: string;
  @Column
  password: string;
  @Column
  email: string;
  @Column({
    type: DataType.ENUM(Roles.Admin, Roles.Inspector),
  })
  role: Roles;
  @Column({ type: DataType.BOOLEAN })
  active: boolean;
  @BeforeSave
  static fullName(instance: User) {
    const name = instance.name || '';
    const lastName = instance.lastName || '';
    instance.fullName = `${name} ${lastName}`;
  }
  @BeforeSave
  static async hashPassword(instance: User) {
    if (instance.changed('password')) {
      const saltRounds = await genSalt(
        +appConfig.get('HASH_SALT_ROUNDS', '10'),
      );
      instance.password = await hash(instance.password, saltRounds);
    }
  }

  @HasOne(() => VerificationToken, 'userId')
  verificationTokens: VerificationToken[];
}

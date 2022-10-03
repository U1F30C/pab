import { genSalt, hash } from 'bcrypt';
import { IsOptional, IsString } from 'class-validator';
import {
  BeforeSave,
  Column,
  DataType,
  Model,
  Table,
} from 'sequelize-typescript';
import { appConfig } from '../../utils/startup-config-service';

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
  jobRole: string;
  @IsString({
    always: true,
  })
  @IsOptional({
    groups: ['update'],
  })
  address: string;
  @IsString({
    always: true,
  })
  @IsOptional({
    groups: ['update'],
  })
  email: string;
  @IsString({
    always: true,
  })
  @IsOptional({
    groups: ['update'],
  })
  phoneNumber: string;
  @IsString({
    always: true,
  })
  @IsOptional({
    groups: ['update'],
  })
  state: string;
  @IsString({
    always: true,
  })
  @IsOptional({
    groups: ['update'],
  })
  username: string;
  @IsString({
    always: true,
  })
  @IsOptional({
    groups: ['update'],
  })
  password: string;
}
export interface IUser {
  id: string;
  name: string;
  jobRole: string;
  address: string;
  email: string;
  phoneNumber: string;
  state: string;
  username: string;
  password: string;
}

@Table({
  modelName: 'user',
  tableName: 'Empleados',
  timestamps: false,
})
export class User extends Model<IUser, Omit<IUser, 'id'>> implements IUser {
  @Column({
    primaryKey: true,
    autoIncrement: true,
    field: 'id_empleado',
    type: DataType.BIGINT,
  })
  id: string;
  @Column({ field: 'nombre' })
  name: string;
  @Column({ field: 'puesto' })
  jobRole: string;
  @Column({ field: 'direccion' })
  address: string;
  @Column({ field: 'correo' })
  email: string;
  @Column({ field: 'telefono' })
  phoneNumber: string;
  @Column({ field: 'estado' })
  state: string;
  @Column({ field: 'usuario' })
  username: string;
  @Column({ field: 'contrasena' })
  password: string;
  @BeforeSave
  static async hashPassword(instance: User) {
    if (instance.changed('password')) {
      const saltRounds = await genSalt(
        +appConfig.get('HASH_SALT_ROUNDS', '10'),
      );
      instance.password = await hash(instance.password, saltRounds);
    }
  }
}

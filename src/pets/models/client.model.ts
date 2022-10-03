import { IsOptional, IsString } from 'class-validator';
import { Column, DataType, Model, Table } from 'sequelize-typescript';

export class ClientRequestBody {
  @IsString({
    always: true,
  })
  @IsOptional({
    groups: ['update'],
  })
  id: string;
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
  description: string;
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
}
export interface IClient {
  id: string;
  name: string;
  description: string;
  address: string;
  email: string;
  phoneNumber: string;
}

@Table({
  modelName: 'client',
  tableName: 'Clientes',
  timestamps: false,
})
export class Client
  extends Model<IClient, Omit<IClient, 'id'>>
  implements IClient
{
  @Column({
    primaryKey: true,
    autoIncrement: true,
    field: 'id_cliente',
    type: DataType.BIGINT,
  })
  id: string;
  @Column({ field: 'nombre' })
  name: string;
  @Column({ field: 'descripcion' })
  description: string;
  @Column({ field: 'direccion' })
  address: string;
  @Column({ field: 'correo' })
  email: string;
  @Column({ field: 'telefono' })
  phoneNumber: string;
}

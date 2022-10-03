import { IsOptional, IsString } from 'class-validator';
import { Column, DataType, Model, Table } from 'sequelize-typescript';

export class PetRequestBody {
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
  image: string;
  @IsString({
    always: true,
  })
  @IsOptional({
    groups: ['update'],
  })
  species: string;
  @IsString({
    always: true,
  })
  @IsOptional({
    groups: ['update'],
  })
  race: string;
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
  sex: string;
}

export interface IPet {
  id: string;
  name: string;
  description: string;
  image: string;
  species: string;
  race: string;
  state: string;
  sex: string;
}

@Table({
  modelName: 'Pet',
  tableName: 'Mascotas',
  timestamps: false,
})
export class Pet extends Model<IPet, Omit<IPet, 'id'>> implements IPet {
  @Column({
    primaryKey: true,
    autoIncrement: true,
    field: 'id_mascota',
    type: DataType.BIGINT,
  })
  id: string;

  @Column({ field: 'nombre' })
  name: string;
  @Column({ field: 'descripcion' })
  description: string;
  @Column({ field: 'imagen' })
  image: string;
  @Column({ field: 'especie' })
  species: string;
  @Column({ field: 'raza' })
  race: string;
  @Column({ field: 'estado' })
  state: string;
  @Column({ field: 'sexo' })
  sex: string;
}

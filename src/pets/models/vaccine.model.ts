import { IsOptional, IsString } from 'class-validator';
import { Column, Model, Table } from 'sequelize-typescript';

export class VaccineRequestBody {
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
  validity: string;
}

export interface IVaccine {
  id: number;
  name: string;
  validity: string;
}

@Table({
  modelName: 'vaccine',
  tableName: 'Vacunas',
  timestamps: false,
})
export class Vaccine
  extends Model<IVaccine, Omit<IVaccine, 'id'>>
  implements IVaccine
{
  @Column({ primaryKey: true, autoIncrement: true, field: 'id_vacuna' })
  id: number;
  @Column({ field: 'nombre_vacuna' })
  name: string;
  @Column({ field: 'vigencia' })
  validity: string;
}

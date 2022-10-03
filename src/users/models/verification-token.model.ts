import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { User } from './user.model';

export interface IVerificationToken {
  userId: number;
  verificationToken: string;
  user?: User;
}

@Table({
  modelName: 'verificationToken',
})
export class VerificationToken
  extends Model<IVerificationToken, IVerificationToken>
  implements IVerificationToken {
  @Column({ primaryKey: true })
  @ForeignKey(() => User)
  userId: number;
  @Column({ type: DataType.STRING, allowNull: false })
  verificationToken: string;

  @BelongsTo(() => User, 'userId')
  user?: User;
}

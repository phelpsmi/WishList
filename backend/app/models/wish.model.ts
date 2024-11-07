import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { User } from "./user.model";

@Table
export class Wish extends Model {
  @Column(DataType.TEXT)
  public title: string;

  @Column(DataType.TEXT)
  public description: string;

  @Column(DataType.BOOLEAN)
  public published: boolean;

  @BelongsTo(() => User, 'ownerId')
  public owner: User;

  @BelongsTo(() => User, 'gifterId')
  public gifter: User;
}
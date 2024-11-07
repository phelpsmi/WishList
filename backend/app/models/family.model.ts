import { Column, Model, Table, DataType, BelongsToMany, BelongsTo } from "sequelize-typescript";
import { FamilyUser } from "./family-user.model";
import { User } from "./user.model";

@Table
export class Family extends Model {
  @Column({type: DataType.TEXT, unique: true})
  public name: string;

  @BelongsToMany(() => User, () => FamilyUser)
  public users: User[];

  @BelongsTo(() => User, 'ownerId')
  public owner: User;
}
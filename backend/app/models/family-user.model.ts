import { Table, ForeignKey, Column, Model, DataType } from "sequelize-typescript";
import { User } from ".";
import { Family } from "./family.model";

@Table
export class FamilyUser extends Model {
  @ForeignKey(() => User)
  @Column(DataType.INTEGER)
  userId: number;

  @ForeignKey(() => Family)
  @Column(DataType.INTEGER)
  familyId: number;
}
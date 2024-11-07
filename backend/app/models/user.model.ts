import { Column, Model, Table, HasMany, DataType, Default, BelongsToMany, Scopes, DefaultScope, AssociationGetOptions } from "sequelize-typescript";
import { FamilyUser } from "./family-user.model";
import { Family } from "./family.model";
import { Wish } from "./wish.model";

@Table
@DefaultScope({
  attributes: {exclude: ['password', 'createdAt', 'updatedAt']}
})
@Scopes({
  auth: {}
})
export class User extends Model {


  @Column({type: DataType.TEXT, unique: true})
  public username: string;

  @Column(DataType.TEXT)
  public password: string;

  @Column({type: DataType.TEXT, unique: true})
  public email: string;

  @Column(DataType.TEXT)
  public firstName: string;

  @Column(DataType.TEXT)
  public lastName: string;

  @Default(false)
  @Column(DataType.BOOLEAN)
  public admin: boolean;

  @HasMany(() => Wish, 'ownerId')
  public wishes: Wish[];

  @HasMany(() => Wish, 'gifterId')
  public gifts: Wish[];

  @BelongsToMany(() => Family, () => FamilyUser)
  public families: Family[];

  @HasMany(() => Family, 'ownerId')
  public ownFamilies: Family[];

  public _getWishes(options?: AssociationGetOptions): Promise<Wish[]> {
    return this.$get('wishes', options);
  }

  public _getGifts(): Promise<Wish[]> {
    return this.$get('gifts');
  }

  public _getFamilies(): Promise<Family[]> {
    return this.$get('families');
  }

  public _addFamily(family: Family | string | number): Promise<any> {
    return this.$add('families', family);
  }

  public _removeFamily(family: Family | string | number): Promise<any> {
    return this.$remove('families', family);
  }
}
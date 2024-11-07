import { User } from "./user.model";

export class Family {
  id?: any;
  name?: string;
  users?: User[];
  owner?: User;
}

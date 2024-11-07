import { Family } from "./family.model";
import { Wish } from "./wish.model";

export class User {
  id?: any;
  username?: string;
  password?: string;
  email?: string;
  firstName?: number;
  lastName?: number;
  wishes?: Wish[];
  gifts?: Wish[];
  families?: Family[];
}

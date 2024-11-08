import { User } from "./user.model";

export class Wish {
  id?: any;
  title?: string;
  description?: string;
  link?: string
  published?: boolean;
  ownerId?: number;
  owner?: User;
  gifterId?: number;
  gifter?: User;
}

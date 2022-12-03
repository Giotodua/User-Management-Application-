import { User } from "./user.model";

export class UserFilter extends User {
  startDate!: string;
  endDate!: string;
  statusName!: string;
  categoryName!: string;
}

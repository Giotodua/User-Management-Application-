import { Category } from "./category.model";
import { Status } from "./status.model";

export class User {
  public id!: number;
  public name!: string;
  public lastName!: string;
  public email!: string;
  public personalIdentificationNumber!: number;
  public date!: string;
  public categoryId!: number;
  public statusId!: number;
  public category!: Category;
  public status!: Status;
}

import { UserRole } from "./user-role.model";

export class UserModel {
  constructor(
    public id: string,
    public firstName: string,
    public lastName: string,
    public username: string,
    public phone: string,
    public workPosition: string,
    public roles: UserRole
  ) { }
}
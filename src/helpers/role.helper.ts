// Interfaces
import { IRole } from "../interface/role.interface";

export class RoleHelper {

  static isRoleValid(requiredRole: string, roles: IRole[]): boolean {
    const res = roles.findIndex(r => r.roleName === requiredRole) >= 0 ? true : false;
    return res;
  }
}
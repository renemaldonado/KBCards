import { RowDataPacket, OkPacket } from "mysql2";

// Interfaces
import { IRole } from "../interface/role.interface";
import { IUser } from "../interface/user.interface";

export class UserHelper {

   static getId(users: RowDataPacket): number {
      let userId: number = 0;

      users.forEach((row: any) => {
         userId = row.id;
      });

      return userId;
   }

   static mapUserDetail(users: RowDataPacket): IUser  {
      var usersList: IUser[] = [];
      var aux: IUser | undefined;
      var user: IUser ;
      var roleList: IRole[] = [];
      var role: IRole;

      users.forEach((row: any) => {
         aux = usersList.find(({ userId }) => userId == row.userId);

         if (aux) {
            const index = usersList.indexOf(aux);
            var roleListAux = aux.roles;
            if (row.roleId) {
               role = {
                  roleId: row.roleId,
                  roleName: row.roleName,
                  rolDescription: row.roleDescription
               };
               roleListAux?.push(role);
            }

            aux.roles = roleListAux;
            usersList[index] = aux;
            user = aux;
         } else {

            if (row.roleId) {
               role = {
                  roleId: row.roleId,
                  roleName: row.roleName,
                  rolDescription: row.roleDescription
               };
               roleList?.push(role);
            }


            user = {
               userId: row.userId,
               username: row.username,
               displayName: row.displayName,
               statusId: row.statusId,
               statusKey: row.statusKey,
               status: row.status,
               passValidTo: row.passValidTo,
               password: row.password,
               roles: roleList
            }
            usersList.push(user);
         }
      });

      return usersList[0];

   }

}
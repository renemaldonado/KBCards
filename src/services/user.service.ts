// DB
import { connect } from '../database';

// Interfaces
import { IUser } from "../interface/user.interface";
import { RowDataPacket } from "mysql2";

// Helpers
import { UserHelper } from "../helpers/user.helper";
import bcrypt from "bcrypt";


export default class UserService {
   constructor() {  }

   public async getUserDetails(userId: number): Promise<IUser> {
      let userDet: IUser;
       
      const query = 'CALL usrsrv_detailsUser(?);';
      const conn = await connect();
      const [rows, fields] = await conn.query(query, [userId]);

      let dataRows: RowDataPacket[];
      
    dataRows = <RowDataPacket[]>rows;
    const users = dataRows[0];
    
    userDet = UserHelper.mapUserDetail(users);
    userDet.password = undefined;
    
      return userDet;
   }

   public async getUsersList(status: number, validTo: string) {
      
      const query = 'CALL usrsrv_readUsers(?, ?, ?);';
      const conn = await connect();
      const [rows, fields] = await conn.query(query, [null, status, validTo]);

      let dataRows: RowDataPacket[];
      dataRows = <RowDataPacket[]>rows;
      const users = dataRows[0] ;

      return users;
   }

   public async createUser(username: string, displayname: string,
                          password: string, roles: any[]): Promise<number> {
      
      const queryUsr = 'CALL usrsrv_createUser(?, ?, ?);';
      const queryRel = 'CALL usrsrv_setRelUsrRole(?, ?);';

      const bcPass = bcrypt.hashSync(password, 10);
      const conn = await connect();
      const [rows, fields] = await conn.query(queryUsr, [username, displayname, bcPass]);
      const userId: number = UserHelper.getId((<RowDataPacket[]>rows)[0]);

      roles.forEach(async (roleId: number)  => {
         const [rowsRel, fieldsRel] = await conn.query(queryRel, [userId, roleId]);
         const relId = UserHelper.getId((<RowDataPacket[]>rowsRel)[0]);
      });

      return userId;
   }
}
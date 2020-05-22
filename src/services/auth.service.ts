// DB
import { connect } from '../database';

// Helpers
import { UserHelper } from "../helpers/user.helper";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// Interfaces
import { RowDataPacket } from "mysql2";

export default class AuthService {
    constructor() { }

    public async createUser(username: string, displayname: string,
        password: string): Promise<number> {

        const queryUsr = 'CALL usrsrv_createUser(?, ?, ?);';

        const bcPass = bcrypt.hashSync(password, 10);
        const conn = await connect();
        const [rows, fields] = await conn.query(queryUsr, [username, displayname, bcPass]);
        const userId: number = UserHelper.getId((<RowDataPacket[]>rows)[0]);

        return userId;
    }

    public async validateUser(userName: string, password: string) {

        const query = 'CALL usrsrv_findUserByUsername(?);';

        const conn = await connect();
        const [rows, fields] = await conn.query(query, [userName]);

        let dataRows: RowDataPacket[];

        dataRows = <RowDataPacket[]>rows;
        const users = dataRows[0];

        const usrDet = UserHelper.mapUserDetail(users);
        if (!usrDet) {
            throw new Error('Auth failed');
        }
        
        if (usrDet.password) {
            const isValid = bcrypt.compareSync(password, usrDet.password );
            if (isValid) {
              const token: string = jwt.sign(
                {
                  userId: usrDet.userId,
                  username: usrDet.username,
                  roles: usrDet.roles 
                },
                process.env['TOKEN_SECRET'] || '',
                {
                  expiresIn: "2h"
                }
              );
              usrDet.password = undefined;
              return {user: usrDet, token: token};

            } else {
                throw new Error('Auth failed');
            }
          } else {
            throw new Error('Auth failed');
          } 
    }

}
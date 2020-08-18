// DB
import { connect } from '../database';

// Interfaces
import { RowDataPacket } from "mysql2";
import { IError } from "../interface/error.interface";

// Helpers
import { ErrorHelper } from "../helpers/error.helper";

export default class UserService {
    constructor() {  }

    public async getErrorsList(inactive: boolean) {
      
        const query = 'CALL kbc_error_list(?);';
        const conn = await connect();
        const [rows, fields] = await conn.query(query, [inactive]);
  
        let dataRows: RowDataPacket[];
        dataRows = <RowDataPacket[]>rows;
        const errors = dataRows[0] ;
  
        return errors;
     }

     public async getErrorDetails(errorId: number) {
        let errorDet: IError;

        const query = 'CALL kbc_error_details(?);';
        const conn = await connect();

        const [rows, fields] = await conn.query(query, [errorId]);

        let dataRows: RowDataPacket[];
        dataRows = <RowDataPacket[]>rows;
        const errors = dataRows[0];

        errorDet = ErrorHelper.mapErrorDetail(errors);


        return errorDet;
     }

     public async createError({ code, text }: { code: string; text: string; }) : Promise<number> {
      
      const queryUsr = 'CALL kbc_error_create(?, ?);';
      const conn = await connect();
      const [rows, fields] = await conn.query(queryUsr, [code, text]);

      const errorId: number = ErrorHelper.getId((<RowDataPacket[]>rows)[0]);

      return errorId;
     }
}


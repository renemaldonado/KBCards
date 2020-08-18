import { RowDataPacket, OkPacket } from "mysql2";

import { IError } from "../interface/error.interface";

export class ErrorHelper {

    static mapErrorDetail(errors: RowDataPacket): IError {
        var errorsList: IError[] = [];
        var aux: IError | undefined;
        var error: IError;

        console.log("Errors: ", errors);

        errors.forEach((row: any) => {
            console.log("Error: ", row);
            error = {
                errorId : row.id,
                code: row.code,
                text: row.text,
                inactive: row.inactive
            }

            errorsList.push(error);
        });
  

        return errorsList[0];
    }

    static getId(errors: RowDataPacket) : number {
        let errorId: number = 0;

        errors.forEach((row: any) => {
        errorId = row.id;
      });

      return errorId;
    }
}
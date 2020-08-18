// Interfaces
import { RowDataPacket, OkPacket } from "mysql2";

export class CardHelper {

static getId(users: RowDataPacket): number {
    let objectId: number = 0;

    users.forEach((row: any) => {
        objectId = row.id;
    });

    return objectId;
 }

}
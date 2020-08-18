// Interfaces
import { ITag } from "../interface/tag.interface";
import { RowDataPacket, OkPacket } from "mysql2";

export class TagHelper {
  static getId(errors: RowDataPacket): number {
    let tagId: number = 0;

    errors.forEach((row: any) => {
      tagId = row.id;
    });

    return tagId;
  }
}

// DB
import { connect } from '../database';

// Interfaces
import { RowDataPacket } from "mysql2";
import { ITag } from "../interface/tag.interface";

// Helpers
import { TagHelper } from "../helpers/tag.helper";

export default class TagService {
    constructor() { }

    public async getTagsList(idx: number, offset: number, pattern: string) {

        pattern = pattern + '%';

        const query = 'CALL kbc_tag_list(?, ?, ?);';
        const conn = await connect();
        const [rows, fields] = await conn.query(query, [idx, offset, pattern]);

        let dataRows: RowDataPacket[];
        dataRows = <RowDataPacket[]>rows;
        const errors = dataRows[0];

        return errors;
    }

    public async createTag(tag: string): Promise<number> {
        const queryStr = "CALL kbc_tag_create(?);";

        const conn = await connect();
        const [rows, fields] = await conn.query(queryStr, [tag]);

        const id: number = TagHelper.getId((<RowDataPacket[]>rows)[0]);
        return id;
    }
}
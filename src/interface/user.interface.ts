import { RowDataPacket } from "mysql2";
import { IRole } from "./role.interface";

//export interface IUser extends RowDataPacket  {
export interface IUser {
    userId?: number;
    username: string;
    displayName: string;
    statusId: number;
    statusKey: string;
    status: string;
    passValidTo: Date;
    password?: string;
    roles?: IRole[];
}


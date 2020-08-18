import { IType } from "./type.interface";


export interface ISource {
   sourceId: number;
   name: string;
   description: string;
   type: IType;
   inactive: boolean;
}
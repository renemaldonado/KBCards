import { IType } from "./type.interface";
import { ITag } from "./tag.interface";
import { IError } from "./error.interface";
import { ISource } from "./source.interface";


export interface ICard {
    cardId?: number;
    descrS: string;
    descrL: string;
    type: IType;
    tags: ITag[];
    sources: [IError,  ISource][],
    user: string
}
import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import { RoleHelper } from "../helpers/role.helper";
import { IRole } from "../interface/role.interface";

export interface IPayload {
    userId: string;
    roles: any;
    exp: number;
}


export const SameUserVal = (req: Request, res: Response, next: NextFunction) => {
     console.log("Check User Id");
    /* Only Detail for current user can be processed, or ADMIN can view All*/
  if ( !(+req.params.id === req.userId)  && !RoleHelper.isRoleValid("ADMIN", req.roles as unknown as IRole[]) ){
    return res.status(401).json({
      message: 'To get any user must be Admin'
    });
  }
  next();
}

export const AuthVal = (role?: string) => {

    return function (req: Request, res: Response, next: NextFunction) {
        const token = req.header('auth-token');
        
        try {
            if (!token) return res.status(401).json('Access Denied - Token');

            const payload = jwt.verify(token, process.env['TOKEN_SECRET'] || '') as IPayload;
            req.userId = +payload.userId;
            req.roles = payload.roles;
            if (role) {
                if (!RoleHelper.isRoleValid(role, req.roles as unknown as IRole[]))
                    return res.status(401).json('Access Denied - Role');
            }

            next();
        } catch (e) {
            res.status(400).send('Invalid Token');
        }
    }


}


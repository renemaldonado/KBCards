import { Request, Response } from "express";

// Interfaces
import { IRole } from "../interface/role.interface";

// Services
import  UserService  from "../services/user.service";

export async function list(req: Request, res: Response) {
  var { status, validToDate } = req.body;

  if (!status) status = null;
  if (!validToDate) validToDate = null;

  try {
    const usrSrv = new UserService();
    const users = await usrSrv.getUsersList(status, validToDate);

    res.status(200).json({
      message: 'Operation OK',
      list: users
    });

  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: 'Error in GetUsers'
    });
  }
}

export async function detail(req: Request, res: Response) {
  const userId: number = +req.params.id;

  try {
   const usrSrv = new UserService();
   const usrDet = await usrSrv.getUserDetails(userId);

    res.status(200).json({
      message: 'Users Detail',
      detail: usrDet
    });

  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: 'Error in GetDetail'
    });
  }
}

export async function create(req: Request, res: Response) {
  const { username, displayname, password, roles } = req.body;

  try {
    const usrSrv = new UserService();
    const userId = await usrSrv.createUser(username, displayname, password, roles );

    res.status(200).json({
      message: 'Operation OK',
      UserId: userId
    });
    
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: 'Error in Create User'
    });
  }
}
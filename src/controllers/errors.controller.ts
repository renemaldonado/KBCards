import { Request, Response } from "express";

// Interfaces
import { IRole } from "../interface/role.interface";

// Services
import  ErrorsServices  from "../services/error.service";


export async function list(req: Request, res: Response) {
    var { inactive } = req.body;
 
    if (!inactive) inactive = null;

    try {
        const errorSrv = new ErrorsServices();
        const errors = await errorSrv.getErrorsList(inactive);
    
        res.status(200).json({
          message: 'Operation OK',
          list: errors
        });
    
      } catch (err) {
        console.log(err);
        res.status(500).json({
          message: 'Error in GetUsers'
        });
      }
}

export async function detail(req: Request, res: Response) {
  const errorId: number = +req.params.id;

  try {
    const errSrv = new ErrorsServices();
    const usrDet = await errSrv.getErrorDetails(errorId);
 
     res.status(200).json({
       message: 'Users Detail...',
       detail: usrDet
     });
 
   } catch (err) {
     console.log(err);
     res.status(500).json({
       message: 'Error in Error GetDetail'
     });
   }
    
}

export async function create(req: Request, res: Response) {
  const { code, text } = req.body;
  try {

    const errSrv = new ErrorsServices();
    const errorId = await errSrv.createError({ code, text });


    res.status(200).json({
      message: 'Operation OK',
      UserId: errorId
    });
    
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: 'Error in Create Error'
    });
  } 
    
}

export async function update(req: Request, res: Response) {
    return res.status(200).json('Welcome to KB-Cards update Errors');
}
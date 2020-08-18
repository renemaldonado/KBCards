import { Request, Response } from "express";

// Services
import  TagService  from "../services/tag.service";

export async function list(req: Request, res: Response) {
    var { pattern, idx, offset } = req.body;
  
  
    try {
      const tagSrv = new TagService();
      const users = await tagSrv.getTagsList(idx, offset, pattern);
  
      res.status(200).json({
        message: 'Operation OK',
        list: users
      });
  
    } catch (err) {
      console.log(err);
      res.status(500).json({
        message: 'Error in GetTags'
      });
    }
  }

  export async function create(req: Request, res: Response) {
    var { tag } = req.body;

    try {
        const tagSrv = new TagService();
        const tagId = await tagSrv.createTag(tag);
    
        res.status(200).json({
          message: 'Operation OK',
          TagId: tagId
        });
    
      } catch (err) {
        console.log(err);
        res.status(500).json({
          message: 'Error in Create Tag'
        });
      }

  }
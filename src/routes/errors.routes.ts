import { Router } from 'express';
const router = Router();

import { AuthVal } from "../middleware/auth.mw";

import { list, detail, create, update } from '../controllers/errors.controller';



router.get('/', AuthVal("USER"),  list);
router.get('/:id', AuthVal("USER"),  detail);
router.post('/', AuthVal("USER"), create);
router.put('/',   update );
//router.get('/:id', c, SameUserVal, detail);
//router.post('/', AuthVal("ADMIN"), create)

export default router;
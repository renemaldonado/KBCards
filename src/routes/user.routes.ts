import { Router } from 'express';
const router = Router();

import { AuthVal, SameUserVal } from "../middleware/auth.mw";

import { list, detail, create } from '../controllers/user.controller';

//router.get('/', AuthVal("ADMIN"), list);
router.get('/', list);
router.get('/:id', AuthVal("USER"), SameUserVal, detail);
router.post('/', AuthVal("ADMIN"), create)

export default router;
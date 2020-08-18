import { Router } from 'express';
const router = Router();

import { AuthVal } from "../middleware/auth.mw";

import { list,  create } from '../controllers/tag.controller';
 
router.get('/', list);
router.post('/', AuthVal("USER"), create)

export default router;
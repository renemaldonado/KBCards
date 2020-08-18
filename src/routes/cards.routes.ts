import { Router } from 'express';
const router = Router();

import { AuthVal } from "../middleware/auth.mw";

import { cardsWelcome, create } from '../controllers/cards.controller';


router.get('/', AuthVal("USER"), cardsWelcome);
router.post('/', AuthVal("USER"), create);
//router.get('/:id', AuthVal("USER"), SameUserVal, detail);
//router.post('/create', AuthVal("ADMIN"), create)

export default router;  
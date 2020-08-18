import {Router} from 'express';
const router = Router();

import  { indexWelcome } from '../controllers/index.controller';

router.get('/', indexWelcome);
router.get('/:id', indexWelcome);
router.post('/', indexWelcome);
router.put('/', indexWelcome);

export default router;


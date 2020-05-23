import { Router } from 'express';
const router = Router();

import {  signin, signup } from '../controllers/auth.controller';


router.post('/signin', signin);
router.post('/signup', signup);

export default router;
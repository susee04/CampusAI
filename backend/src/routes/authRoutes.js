import { Router } from 'express';
import { signUp, signIn, signOut, me } from '../controllers/authController.js';

const router = Router();

router.post('/signup', signUp);
router.post('/signin', signIn);
router.post('/signout', signOut);
router.get('/me', me);

export default router;

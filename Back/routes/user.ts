import express from 'express';
const router = express.Router();
import passport from 'passport';
import { logInOnly } from '../middlewares/passportmiddlewares';
import userController from '../controllers/userController';

router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get('/google/callback', passport.authenticate('google', { failureRedirect: '/' }), userController.googleCallback);

router.get('/me', logInOnly, userController.me);

export default router;
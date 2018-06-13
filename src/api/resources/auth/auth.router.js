import express from 'express';
import passport from 'passport';
import authController from './auth.controller';

export const authRouter = express.Router();

authRouter.get(
  '/google',
  passport.authenticate('google', {
    scope: ['profile', 'email'],
  })
);
authRouter.get(
  '/google/callback',
  passport.authenticate('google', {
    failureRedirect: '/failure',
  }),
  authController.sendJwdToken
);
authRouter.get('/twitter', passport.authenticate('twitter'));
authRouter.get(
  '/twitter/callback',
  passport.authenticate('twitter', {
    failureRedirect: '/failure',
  }),
  authController.sendJwdToken
);
authRouter.get('/authenticate', passport.authenticate('jwt', { session: false }), authController.authenticate);
authRouter.get('/logout', passport.authenticate('jwt', { session: false }), authController.logout);

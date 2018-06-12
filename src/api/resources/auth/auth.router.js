import express from 'express';
import passport from 'passport';

export const authRouter = express.Router();

authRouter.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
authRouter.get('/google/callback', passport.authenticate('google', { failureRedirect: '/failure' }), (req, res) => {
  res.json({ msg: 'Authenticated' });
});

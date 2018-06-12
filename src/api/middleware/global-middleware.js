import express from 'express';
import logger from 'morgan';
import cors from 'cors';
import passport from 'passport';
import session from 'express-session';
import swaggerUi from 'swagger-ui-express';
import swaggerDocument from '../../config/swagger.json';
import { configureJWTStrategy } from './passport-jwt';
import { configureGoogleStrategy } from './passport-google';
import { devConfig } from '../../config/env/development';

export const setGlobalMiddleware = app => {
  app.use(express.json());
  app.use(
    express.urlencoded({
      extended: true,
    })
  );
  app.use(cors());
  app.use(logger('dev'));
  app.use(
    session({
      secret: devConfig.secret,
      resave: true,
      saveUninitialized: true,
    })
  );
  app.use(passport.initialize());
  app.use(passport.session());
  configureJWTStrategy();
  configureGoogleStrategy();
  // Save user into session
  // app.use(
  //   passport.serializeUser((user, done) => {
  //     done(null, user._id);
  //   })
  // );
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });
  passport.deserializeUser((id, done) => {
    done(null, { id: 'asdf' });
  });
  app.use(
    '/api-docs',
    swaggerUi.serve,
    swaggerUi.setup(swaggerDocument, {
      explorer: true,
    })
  );
};

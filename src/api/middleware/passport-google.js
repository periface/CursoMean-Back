import passport from 'passport';
import GoogleStrategy from 'passport-google-oauth';
import { devConfig } from '../../config/env/development';
// Use the GoogleStrategy within Passport.
//   Strategies in passport require a `verify` function, which accept
//   credentials (in this case, a token, tokenSecret, and Google profile), and
//   invoke a callback with a user object.
export const configureGoogleStrategy = () => {
  passport.use(
    new GoogleStrategy.OAuth2Strategy(
      {
        clientID: devConfig.auth.google.client,
        clientSecret: devConfig.auth.google.secret,
        callbackURL: devConfig.auth.google.callback,
      },
      (accessToken, refreshToken, profile, done) => {
        console.log('access token', accessToken);
        console.log('tokenSecret', refreshToken);
        console.log('profile', profile);
        done(null, profile);
      }
    )
  );
};

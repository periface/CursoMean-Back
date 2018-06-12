import passport from 'passport';
import GoogleStrategy from 'passport-google-oauth';
import { devConfig } from '../../config/env/development';
import User from '../resources/user/user.model';
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
      async (accessToken, refreshToken, profile, done) => {
        try {
          console.log('access token', accessToken);
          console.log('tokenSecret', refreshToken);
          console.log('profile', profile);
          const user = await User.findOne({ 'google.id': profile.id });
          if (user) {
            return done(null, user);
          }
          const newUser = new User({});
          newUser.google.id = profile.id;
          newUser.google.token = accessToken;
          newUser.google.displayName = profile.displayName;
          newUser.google.email = profile.emails[0].value;
          await newUser.save();
          done(null, newUser);
        } catch (error) {
          console.error(error);
          return done(error);
        }
      }
    )
  );
};

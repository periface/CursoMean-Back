import passport from 'passport';
import TwitterStrategy from 'passport-twitter';
import { devConfig } from '../../config/env/development';
import User from '../resources/user/user.model';

export const ConfigureTwitterStrategy = () => {
  passport.use(
    new TwitterStrategy.Strategy(
      {
        consumerKey: devConfig.auth.twitter.client,
        consumerSecret: devConfig.auth.twitter.secret,
        callbackURL: devConfig.auth.twitter.callback,
      },
      async (accessToken, tokenSecret, profile, done) => {
        try {
          const user = await User.findOne({
            'twitter.id': profile.id,
          });
          if (user) {
            return done(null, user);
          }
          const newUser = new User({});
          newUser.twitter.id = profile.id;
          newUser.twitter.token = accessToken;
          newUser.twitter.displayName = profile.displayName;
          newUser.twitter.username = profile.username;
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

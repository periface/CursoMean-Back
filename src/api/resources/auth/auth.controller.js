import jwt from 'jsonwebtoken';
import { devConfig } from '../../../config/env/development';

export default {
  sendJwdToken(req, res) {
    const token = jwt.sign(
      {
        id: req.user._id,
      },
      devConfig.secret,
      {
        expiresIn: '1d',
      }
    );
    // return res.json({
    //   success: true,
    //   token,
    // });
    res.redirect(`${devConfig.frontEndUrl}/dashboard/?token=${token}`);
  },
  authenticate(req, res) {
    return res.json(true);
  },
  logout(req, res) {
    req.logout(); // Remove the session;
    return res.json({ success: true });
  },
};

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
    res.redirect(`${devConfig.frontEndUrl}/dashboard/invoices/?token=${token}`);
  },
  authenticate(req, res) {
    return res.json(true);
  },
};

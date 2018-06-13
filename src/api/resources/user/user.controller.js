import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { BAD_REQUEST, INTERNAL_SERVER_ERROR, NOT_FOUND, UNAUTHORIZED } from 'http-status-codes';
import { devConfig } from '../../../config/env/development';

import userService from './user.service';
import User from './user.model';
import { getJWTToken } from '../../modules/utils';
import { sendEmail } from '../../modules/mail';

export default {
  async signup(req, res) {
    try {
      const { error, value } = userService.validateSignUpSchema(req.body);
      if (error && error.details) {
        return res.status(BAD_REQUEST).json(error);
      }
      const existingUser = await User.findOne({ 'local.email': value.email });
      if (existingUser) {
        return res.status(BAD_REQUEST).json({ err: 'Account already exist...' });
      }
      const user = await new User({});
      user.local.email = value.email;
      const salt = await bcryptjs.genSalt();
      const hash = await bcryptjs.hash(value.password, salt);
      user.local.password = hash;
      user.local.name = value.name;
      await user.save();
      return res.json({
        success: true,
        message: 'User created',
      });
    } catch (error) {
      return res.status(INTERNAL_SERVER_ERROR).json(error);
    }
  },
  async login(req, res) {
    try {
      const { error, value } = userService.validateLoginSchema(req.body);
      if (error && error.details) {
        return res.status(BAD_REQUEST).json(error);
      }
      const user = await User.findOne({
        'local.email': value.email,
      });
      if (!user)
        return res.status(BAD_REQUEST).json({
          err: 'Invalid email/password',
        });
      console.log(value.password);
      console.log(user.password);
      const matched = await bcryptjs.compare(value.password, user.local.password);
      console.log(matched);
      if (!matched) {
        return res.status(UNAUTHORIZED).json({
          success: false,
        });
      }
      const token = jwt.sign(
        {
          id: user._id,
        },
        devConfig.secret,
        {
          expiresIn: '1d',
        }
      );
      return res.json({
        success: true,
        token,
      });
    } catch (error) {
      return res.status(INTERNAL_SERVER_ERROR).json(error);
    }
  },
  async test(req, res) {
    return res.json(req.user);
  },
  async forgotPassword(req, res) {
    try {
      const { value, error } = userService.validateForgotPasswordSchema(req.body);
      if (error && error.details) {
        return res.status(BAD_REQUEST).json(error);
      }
      const criteria = {
        $or: [
          {
            'google.email': value.email,
          },
          {
            'twitter.email': value.email,
          },
          {
            'local.email': value.email,
          },
        ],
      };
      const user = await User.findOne(criteria);
      if (!user) {
        return res.status(NOT_FOUND).json({ err: 'User not found' });
      }
      const token = getJWTToken({ id: user._id });
      const resetLink = `<h4>Please click on the link to reset the password</h4><a href='${
        devConfig.frontEndUrl
      }/reset-password/${token}'>Click</a>`;

      const sanitizedUser = userService.getUser(user);

      const data = await sendEmail({
        html: resetLink,
        subject: 'Forgot password',
        email: sanitizedUser.email,
      });

      return res.json(data);
    } catch (error) {
      return res.status(INTERNAL_SERVER_ERROR).json({ err: error });
    }
  },
};

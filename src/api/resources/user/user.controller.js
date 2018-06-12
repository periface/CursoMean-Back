import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { BAD_REQUEST, INTERNAL_SERVER_ERROR, NOT_FOUND, UNAUTHORIZED } from 'http-status-codes';
import { devConfig } from '../../../config/env/development';

import userService from './user.service';
import User from './user.model';

export default {
  async signup(req, res) {
    try {
      const { error, value } = userService.validateCreateSchema(req.body);
      if (error && error.details) {
        return res.status(BAD_REQUEST).json(error);
      }
      const user = await User.create(value);
      delete user.password;
      return res.json({
        success: true,
        message: 'User created',
        user,
      });
    } catch (error) {
      return res.status(INTERNAL_SERVER_ERROR).json(error);
    }
  },
  async login(req, res) {
    try {
      const { error, value } = userService.validateCreateSchema(req.body);
      if (error && error.details) {
        return res.status(BAD_REQUEST).json(error);
      }
      const user = await User.findOne({ email: value.email });
      if (!user) return res.status(BAD_REQUEST).json({ err: 'Invalid email/password' });
      const matched = bcryptjs.compare(value.password, user.password);
      if (!matched) {
        return res.status(UNAUTHORIZED).json({ err: 'Bad credentials' });
      }

      const token = jwt.sign(
        {
          id: user._id,
        },
        devConfig.secret,
        { expiresIn: '1d' }
      );
      return res.json({ success: true, token });
    } catch (error) {
      return res.status(INTERNAL_SERVER_ERROR).json(error);
    }
  },
  async test(req, res) {
    return res.json(req.user);
  },
};

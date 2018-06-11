import { BAD_REQUEST, INTERNAL_SERVER_ERROR } from 'http-status-codes';
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
      return res.json(user);
    } catch (error) {
      return res.status(INTERNAL_SERVER_ERROR).json(error);
    }
  },
};

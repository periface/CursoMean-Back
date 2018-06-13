import Joi from 'joi';

export default {
  validateSignUpSchema(body) {
    const schema = Joi.object().keys({
      email: Joi.string()
        .email()
        .required(),
      password: Joi.string().required(),
      name: Joi.string().required(),
    });
    const { error, value } = Joi.validate(body, schema);
    if (error && error.details) {
      return {
        error,
      };
    }
    return {
      value,
    };
  },
  validateLoginSchema(body) {
    const schema = Joi.object().keys({
      email: Joi.string()
        .email()
        .required(),
      password: Joi.string().required(),
    });
    const { error, value } = Joi.validate(body, schema);
    if (error && error.details) {
      return {
        error,
      };
    }
    return {
      value,
    };
  },
  getUser(user) {
    const resp = {};
    if (user.local.email) {
      resp.name = user.local.name;
      resp.email = user.local.email;
    }
    if (user.google.email) {
      resp.name = user.google.displayName;
      resp.email = user.google.email;
    }
    if (user.twitter.email) {
      resp.name = user.twitter.displayName;
      resp.email = user.twitter.email;
    }
    return resp;
  },
};

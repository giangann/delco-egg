import joi from 'joi';

export default {
  register: {
    body: {
      username: joi.string().required(),
      password: joi.string().min(6).max(30).required(),
      phone_number: joi.string().min(3).max(100).required(),
      fullname: joi.string().min(3).max(100).required(),
    },
  },
  login: {
    body: {
      username: joi.string().required(),
      password: joi.string().required(),
    },
  },
  updateMe: {
    body: {
      company_name: joi.string().min(3).max(100).required(),
      fullname: joi.string().min(3).max(100).required(),
      phone_number: joi.string().min(3).max(100).required(),
    },
  },
};

const basePath = '/';

export default {
  url: {
    basePath,
  },
  timers: {
    userCookieExpiry: '720h',
  },
  env: {
    authSecret: process.env.TOKEN_SECRET_KEY || 'test',
  },
  authorizationIgnorePath: [
    '/',
    '/client/auth/login',
    '/client/auth/register',
    '/admin/auth/login',
    '/admin/auth/register',
  ],
  status: {
    WAITING_APPROVAL: 0,
    ACCEPTED: 1,
    SUCCESS: 2,
    REJECTED: -1,
    CANCELED: -2,
  },
};

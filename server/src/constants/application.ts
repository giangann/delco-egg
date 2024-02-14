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
  noti:{
    content: {
      CREATED:'Đơn hàng mới, hãy kiểm tra',
      ACCEPTED: 'Đơn hàng được chấp nhận',
      REJECTED: 'Đơn hàng bị từ chối, hãy kiểm tra',
      SUCCESS:'Đơn hàng kết thúc thành công'
    }
  }
};

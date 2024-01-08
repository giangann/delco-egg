import { SLUG } from "./slug.ts"

const SCREEN_PATHS = {
  ALL: '*',
  HOME: '/',
  AUTH: 'auth',
  LOGIN: '/login',
  DASHBOARD: '/dashboard',
  FORGOT_PASSWORD: '/forgot-password',
  RESET_PASSWORD: '/reset-password',
  ACCOUNT_USER: '/account-user',
  MY_PROFILE: '/my-profile',
  GROUP_USER: '/group-user',
  NOTIFICATION: '/notification',
  MANAGEMENT_PERMISSIONS: '/management-permission',
  TIME_SHEET: '/time-sheet',
  APPROVE: '/approve',
  PROJECT: '/project',
  REPORT: '/report',
  PERMISSION: '/permission',
  LIST_BOOK_BY_COLLECTION: `${SLUG.COLLECTION}:slug`,
  LIST_BOOK_BY_GENRE: `${SLUG.GENRE}:slug`,
  BOOK: '/:slug',
  BOOK_DETAIL: '/:slug/:detail',
  BOOK_MANAGEMENT: '/book-management',
  CHAPTER: '/book-management/:slug'
}

export default SCREEN_PATHS

import { SLUG } from "./slug.ts";

const SCREEN_PATHS = {
  ALL: "*",
  HOME: "/",
  AUTH: "auth",
  LOGIN: "/login",
  DASHBOARD: "/dashboard",
  FORGOT_PASSWORD: "/forgot-password",
  RESET_PASSWORD: "/reset-password",
  ACCOUNT_USER: "/account-user",
  GROUP_USER: "/group-user",
  NOTIFICATION: "/notification",
  MANAGEMENT_PERMISSIONS: "/management-permission",
  TIME_SHEET: "/time-sheet",
  APPROVE: "/approve",
  PROJECT: "/project",
  REPORT: "/report",
  PERMISSION: "/permission",
  LIST_BOOK_BY_COLLECTION: `${SLUG.COLLECTION}:slug`,
  LIST_BOOK_BY_GENRE: `${SLUG.GENRE}:slug`,
  BOOK: "/:slug",
  BOOK_DETAIL: "/:slug/:detail",
  BOOK_MANAGEMENT: "/book-management",
  CHAPTER: "/book-management/:slug",
  // ---------------------------------------------------
  ABOUT: SLUG.ABOUT,
  QUY_TRINH: `/quy-trinh-trung`,
  CHUNG_NHAN: `${SLUG.ABOUT}/chung-nhan`,
  CONTACT: "/lien-he",
  CREATE: `${SLUG.APPLICATION}/tao-moi`,
  LIST: `${SLUG.APPLICATION}/danh-sach`,
  DETAIL: `${SLUG.APPLICATION}/chi-tiet/:id`,
  MY_PROFILE: "/my-profile",
};

export default SCREEN_PATHS;

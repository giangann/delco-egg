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
  MY_PROFILE: "/my-profile",
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
  ABOUT: "/ve-chung-toi",
  CONTACT: "/lien-he",
  APPLICATION: {
    CREATE: `${SLUG.APPLICATION}/tao-moi`,
    LIST: `${SLUG.APPLICATION}/danh-sach`,
    DETAIL: `${SLUG.APPLICATION}/chi-tiet/:id`,
  },
  USER: {
    CREATE: `${SLUG.USER}/tao-moi`,
    LIST: `${SLUG.USER}/danh-sach`,
    DETAIL: `${SLUG.USER}/chi-tiet/:id`,
  },
  EGG: {
    UPDATE_PRICE: `${SLUG.EGG}/cap-nhat-gia`,
    UPDATE_QUANTITY: `${SLUG.EGG}/cap-nhat-so-luong`,
    UPDATE_TYPE: `${SLUG.EGG}/cap-nhat-mix`,
  },
};

export default SCREEN_PATHS;

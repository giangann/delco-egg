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
  LIST_BOOK_BY_GENRE: `${SLUG.GENRE}:slug`,
  BOOK: "/:slug",
  BOOK_DETAIL: "/:slug/:detail",
  BOOK_MANAGEMENT: "/book-management",
  CHAPTER: "/book-management/:slug",
  // ---------------------------------------------------
  MY_PROFILE: "/my-profile",
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
    LIST_TYPE: `${SLUG.EGG}/danh-sach-cac-loai`,
    CREATE_TYPE: `${SLUG.EGG}/tao-loai-moi`,
    UPDATE_PRICE: `${SLUG.EGG}/cap-nhat-gia`,
    UPDATE_QUANTITY: `${SLUG.EGG}/cap-nhat-so-luong`,
    UPDATE_TYPE: `${SLUG.EGG}/cap-nhat-mix`,
  },
  MANAGE: {
    USER: {
      CREATE: `${SLUG.MANAGE}${SLUG.USER}${SLUG.CREATE}`,
      LIST: `${SLUG.MANAGE}${SLUG.USER}${SLUG.LIST}`,
      DETAIL: `${SLUG.MANAGE}${SLUG.USER}${SLUG.DETAIL}/:id`,
    },
    EGG: {
      INDEX:`${SLUG.MANAGE}${SLUG.EGG}`,
      LIST: `${SLUG.MANAGE}${SLUG.EGG}${SLUG.LIST}`,
      CREATE: `${SLUG.MANAGE}${SLUG.EGG}${SLUG.CREATE}`,
      UPDATE_PRICE: `${SLUG.MANAGE}${SLUG.EGG}/cap-nhat-gia`,
      UPDATE_QUANTITY: `${SLUG.MANAGE}${SLUG.EGG}/cap-nhat-so-luong`,
      UPDATE_TYPE: `${SLUG.MANAGE}${SLUG.EGG}/cap-nhat-mix`,
    },
    APPLICATION: {
      CREATE: `${SLUG.MANAGE}${SLUG.APPLICATION}${SLUG.CREATE}`,
      LIST: `${SLUG.MANAGE}${SLUG.APPLICATION}${SLUG.LIST}`,
      DETAIL: `${SLUG.MANAGE}${SLUG.APPLICATION}${SLUG.DETAIL}/:id`,
    },
  },
  STATISTIC: {
    REVENUE: `${SLUG.STATISTIC}${SLUG.REVENUE}`,
    APPLICATION: `${SLUG.STATISTIC}${SLUG.APPLICATION}`,
    EGG: `${SLUG.STATISTIC}${SLUG.EGG}`,
    USER: `${SLUG.STATISTIC}${SLUG.USER}`,
  },
};

export default SCREEN_PATHS;

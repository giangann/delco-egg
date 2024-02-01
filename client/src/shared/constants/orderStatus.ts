export enum ORDER_STATUS {
  WAITING_APPROVAL = 0,
  ACCEPTED = 1,
  SUCCESS = 2,
  REJECTED = -1,
  CANCELED = -2,
}

export enum ORDER_STATUS_LABEL {
  WAITING_APPROVAL = "Đang chờ",
  ACCEPTED = "Chấp nhận",
  SUCCESS = "Thành công",
  REJECTED = "Từ chối",
  CANCELED = "Đã hủy",
}

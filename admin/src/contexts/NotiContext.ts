import { createContext } from "react";
import { INoti } from "../shared/types/noti";

interface INotiContext {
  listNoti: INoti[];
  refetch: () => void;
  maskAsRead: (notiId: number) => Promise<void>;
}
export const NotiContext = createContext<INotiContext>({
  listNoti: [],
  refetch: () => {},
  maskAsRead: async () => {},
});

import { createContext, useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { getApi, putApi } from "../../lib/utils/fetch/fetchRequest";
import { INoti } from "../../shared/types/noti";
import { Footer } from "./Footer";
import { Header } from "./Header/Header";
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
export const Layout = () => {
  const [listNoti, setListNoti] = useState<INoti[]>([]);
  const [refetch, setRefetch] = useState(1);
  const refetchListNoti = () => {
    setRefetch(refetch + 1);
  };
  const maskAsRead = async (notiId: number) => {
    const updateResult = await putApi(`noti/${notiId}`);
    if (updateResult.sucees) console.log("mask as read success", notiId);
  };

  useEffect(() => {
    async function fetchListNoti() {
      const fetchListNotiResponse = await getApi("noti");
      if (fetchListNotiResponse.success)
        setListNoti(fetchListNotiResponse.data);
    }
    fetchListNoti();
  }, [refetch]);
  return (
    <NotiContext.Provider
      value={{ listNoti, maskAsRead, refetch: refetchListNoti }}
    >
      <Header />
      <Outlet />
      <Footer />
    </NotiContext.Provider>
  );
};

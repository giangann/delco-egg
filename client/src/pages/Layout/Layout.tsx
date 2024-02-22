import { useCallback, useContext, useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { NotiContext } from "../../contexts/NotiContext";
import { SocketContext } from "../../contexts/SocketContext";
import useAuth from "../../hooks/useAuth";
import { getApi, putApi } from "../../lib/utils/fetch/fetchRequest";
import { INoti } from "../../shared/types/noti";
import { Footer } from "./Footer";
import { Header } from "./Header/Header";

export const Layout = () => {
  const [listNoti, setListNoti] = useState<INoti[]>([]);
  const { user } = useAuth();
  const wsServer = useContext(SocketContext);

  const refetchListNoti = () => {
    fetchListNoti()
  };
  const maskAsRead = async (notiId: number) => {
    const updateResult = await putApi(`noti/${notiId}`);
    if (updateResult.sucees) console.log("mask as read success", notiId);
  };

  const fetchListNoti = useCallback(async () => {
    const fetchListNotiResponse = await getApi("noti");
    if (fetchListNotiResponse.success) setListNoti(fetchListNotiResponse.data);
  }, []);

  useEffect(() => {
    wsServer.emit("parseUser", user);
  }, []);

  useEffect(() => {
    fetchListNoti();
  }, []);

  useEffect(() => {
    wsServer.on("newNoti", (message) => {
      console.log(message);
      fetchListNoti();
    });

    return () => {
      wsServer.off("newNoti");
    };
  }, []);

  return (
    <SocketContext.Provider value={wsServer}>
      <NotiContext.Provider
        value={{ listNoti, maskAsRead, refetch: refetchListNoti }}
      >
        <Header />
        <Outlet />
        <Footer />
      </NotiContext.Provider>
    </SocketContext.Provider>
  );
};

import { useDevice } from "../../hooks/useDevice";
import { QuyTrinhTrungDesktop } from "./QuyTrinhTrungDesktop";
import { QuyTrinhTrungMobile } from "./QuyTrinhTrungMobile";
export const QuyTrinhTrung = () => {
  const { isMobile } = useDevice();
  return isMobile ? <QuyTrinhTrungMobile /> : <QuyTrinhTrungDesktop />;
};

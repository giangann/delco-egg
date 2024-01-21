import { useDevice } from "../../../hooks/useDevice";
import { HeaderDesktop } from "./Desktop/HeaderDesktop";
import { HeaderMobile } from "./Mobile/HeaderMobile";

export const Header = () => {
  const { isMobile } = useDevice();
  return isMobile ? <HeaderMobile /> : <HeaderDesktop />;
};

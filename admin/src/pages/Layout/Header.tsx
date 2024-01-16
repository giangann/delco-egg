import { useDevice } from "../../hooks/useDevice";
import { HeaderDesktop } from "./HeaderDesktop";
import { HeaderMobile } from "./HeaderMobile";

export const Header = () => {
  const { isMobile } = useDevice();
  return isMobile ? <HeaderMobile /> : <HeaderDesktop />;
};

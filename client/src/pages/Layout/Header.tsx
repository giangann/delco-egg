import { useDevice } from "../../hooks/useDevice";
import SCREEN_PATHS from "../../shared/constants/screenPaths";
import { HeaderDesktop } from "./HeaderDesktop";
import { HeaderMobile } from "./HeaderMobile";

export const Header = () => {
  const { isMobile } = useDevice();
  return isMobile ? <HeaderMobile /> : <HeaderDesktop />;
};

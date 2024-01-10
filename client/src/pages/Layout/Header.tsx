import SCREEN_PATHS from "../../shared/constants/screenPaths";

export const Header = () => {
  return (
    <div>
      <p>This is Header</p>
      <a href="/">Trang chu</a>
      <a href={SCREEN_PATHS.LOGIN}>Login</a>
    </div>
  );
};

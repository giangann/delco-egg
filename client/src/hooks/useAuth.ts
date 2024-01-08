import { useAtom } from "jotai";
import { userAtom } from "../atom/useAtom";

const useAuth = () => {
  const [user, setUser] = useAtom(userAtom);
  const isAuthenticated = user;

  return {
    isAuthenticated,
  };
};

export default useAuth;

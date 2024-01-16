import { useAtomValue } from "jotai";
import { userAtom } from "../atom/useAtom";

const useAuth = () => {
  const [user] = useAtomValue(userAtom);
  const isAuthenticated = user;

  return {
    isAuthenticated,
  };
};

export default useAuth;

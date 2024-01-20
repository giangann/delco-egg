import { useAtom } from "jotai";
import { useCallback } from "react";
import { userAtom } from "../atom/useAtom";
import { getApi, postApi } from "../lib/utils/fetch/fetchRequest";

const useAuth = () => {
  const [user, setUserAtom] = useAtom(userAtom);

  const checkUser = useCallback(async () => {
    const result = await getApi("me");
    if (result.success) {
      setUserAtom(result.data);
    }
  }, [setUserAtom]);

  const login = async (email: string, password: string) => {
    const data = { email, password };
    const result = await postApi("auth/login", data);
    if (result.success) {
      setUserAtom(result.data);
    }
  };
  return {
    user,
    checkUser,
    login,
  };
};

export default useAuth;

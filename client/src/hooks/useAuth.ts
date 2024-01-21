import { useAtom } from "jotai";
import { useCallback } from "react";
import { userAtom } from "../atom/useAtom";
import { getApi, postApi } from "../lib/utils/fetch/fetchRequest";
import { IUserLogin } from "../shared/types/user";

const useAuth = () => {
  const [user, setUserAtom] = useAtom(userAtom);

  const checkUser = useCallback(async () => {
    const result = await getApi("me");
    if (result.success) {
      setUserAtom(result.data);
    }
  }, [setUserAtom]);

  const login = async (user: IUserLogin) => {
    const result = await postApi("auth/login", user);
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

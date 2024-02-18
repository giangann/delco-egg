import { useAtom } from "jotai";
import { useCallback } from "react";
import { userAtom } from "../atom/userAtom";
import { getApi, postApi } from "../lib/utils/fetch/fetchRequest";
import { IUserAtom, IUserLogin } from "../shared/types/user";
import { toast } from "react-toastify";

const useAuth = () => {
  const [user, setUserAtom] = useAtom(userAtom);

  const checkUser = useCallback(async () => {
    const result = await getApi<IUserAtom>("me");
    if (result.success) {
      setUserAtom(result.data);
    }
  }, [setUserAtom]);

  const login = async (user: IUserLogin) => {
    const result = await postApi<IUserAtom>("auth/login", user);
    if (result.success) {
      setUserAtom(result.data);
    } else {
      toast.error(result.error.message);
    }
    return result;
  };

  const logout = async () => {
    const result = await getApi("auth/logout");
    if (result.success) {
      setUserAtom(null);
    }
    return result;
  };
  return {
    user,
    checkUser,
    login,
    logout,
  };
};

export default useAuth;

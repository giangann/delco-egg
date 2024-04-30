import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserListContext, UserParams } from "../../contexts/UserListContext";
import { useDevice } from "../../hooks/useDevice";
import { defaultPagi } from "../../shared/constants/common";
import SCREEN_PATHS from "../../shared/constants/screenPaths";
import { screenPathRemoveSlug } from "../../shared/helper";
import { IPagination } from "../../shared/types/base";
import { IUserRow } from "../../shared/types/user";
import { getApi } from "../../lib/utils/fetch/fetchRequest";
import { UserListDesktop } from "./UserListDesktop";
import { UserListMobile } from "./UserListMobile";

export const UserList = () => {
  const [userList, setUserList] = useState<IUserRow[]>([]);
  const [pagi, setPagi] = useState<IPagination>(defaultPagi);
  const { isMobile } = useDevice();
  const [params, setParams] = useState<UserParams>({
    page: 1,
    limit: 5,
  });
  const navigate = useNavigate();

  const onViewDetail = ({ id }: IUserRow) => {
    let newPathWithoutSlug = screenPathRemoveSlug(
      SCREEN_PATHS.MANAGE.USER.DETAIL
    );
    navigate(`${newPathWithoutSlug}/${id}`);
  };

  const onSetParams = (key: keyof UserParams, value: any) => {
    setParams((prev) => {
      return {
        ...prev,
        [key]: value,
      };
    });
  };

  const onClearParams = (key: keyof UserParams) => {
    setParams((prev) => {
      delete prev[key];
      return { ...prev };
    });
  };

  const fetchListUser = useCallback(async () => {
    const res = await getApi<IUserRow[]>(
      "user",
      params as unknown as Record<string, string>
    );
    if (res.success) {
      setUserList(res.data);
      setPagi(res.pagination || defaultPagi);
    }
  }, [params]);

  useEffect(() => {
    fetchListUser();
  }, [params]);

  return (
    <UserListContext.Provider
      value={{
        params: params,
        setParams: onSetParams,
        clearParams: onClearParams,
        userList,
        onViewDetail,
        pagination: pagi,
      }}
    >
      {isMobile ? <UserListMobile /> : <UserListDesktop />}
    </UserListContext.Provider>
  );
};

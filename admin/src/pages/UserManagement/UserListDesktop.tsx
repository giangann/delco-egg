import { useContext } from "react";
import { Page } from "../../components/Page/Page";
import { CustomPagiProps } from "../../components/Table/CustomPagi";
import { CustomTable, StrictField } from "../../components/Table/Customtable";
import { UserListContext } from "../../contexts/UserListContext";
import { IUserRow } from "../../shared/types/user";
import { Stack } from "@mui/material";
import { FilterUser } from "./FilterUser";
import { ButtonResponsive } from "../../styled/styled";
import { useNavigate } from "react-router-dom";
import { MaterialSymbolsArrowCircleRight } from "../../shared/icons/Icon";
import SCREEN_PATHS from "../../shared/constants/screenPaths";

export const UserListDesktop = () => {
  const {
    params: { limit },
    pagination,
    setParams,
    userList,
    onViewDetail,
  } = useContext(UserListContext);
  const { currentPage, nextPage, previousPage, totalPages } = pagination;

  const pagiProps: CustomPagiProps = {
    currPage: currentPage,
    totalPage: totalPages,
    onGoToEnd: () => {
      setParams("page", totalPages);
    },
    onGoToStart: () => {
      setParams("page", 1);
    },
    onNextPage: () => {
      setParams("page", nextPage);
    },
    onPerPageChange: (newLimit: number) => {
      setParams("limit", newLimit);
      setParams("page", 1);
    },
    onPrevPage: () => {
      setParams("page", previousPage);
    },
    perpage: limit as number,
  };
  const fields: StrictField<IUserRow>[] = [
    {
      header: "Id",
      fieldKey: "id",
      width: 50,
    },
    {
      header: "Tên đăng nhập",
      fieldKey: "username",
      width: 250,
    },
    {
      header: "Số điện thoại",
      fieldKey: "phone_number",
      width: 250,
    },
    {
      header: "Họ tên",
      fieldKey: "fullname",
      width: 250,
    },
    {
      header: "Công ty",
      fieldKey: "company_name",
      width: 250,
    },
  ];
  return (
    <Page title="Danh sách người dùng">
      <Stack direction={"row"} justifyContent={"space-between"} my={1}>
        <FilterUser />
        <NewUser/>
      </Stack>
      <CustomTable
        pagiProps={pagiProps}
        fields={fields}
        data={userList}
        onActionViewDetail={onViewDetail}
      />
    </Page>
  );
};

const NewUser = () => {
  const navigate = useNavigate()
  return (
    <ButtonResponsive
      onClick={() => {
        navigate(SCREEN_PATHS.MANAGE.USER.CREATE);
      }}
      variant="contained"
      endIcon={
        <MaterialSymbolsArrowCircleRight
          color={"white"}
          style={{ fontSize: 24 }}
        />
      }
    >
      Tạo mới
    </ButtonResponsive>
  );
};

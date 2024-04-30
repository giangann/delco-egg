import { Box, Typography, styled } from "@mui/material";
import { grey } from "@mui/material/colors";
import { useContext } from "react";
import { PageMobile } from "../../components/Page/PageMobile";
import { BasePagi } from "../../components/Pagi/BasePagi";
import { UserListContext } from "../../contexts/UserListContext";
import { OPACITY_TO_HEX } from "../../shared/constants/common";
import { IcOutlineNavigateNext } from "../../shared/icons/Icon";
import { IUserRow } from "../../shared/types/user";
import { alignCenterSx } from "../../styled/styled";
import { FilterUser } from "./FilterUser";

export const UserListMobile = () => {
  return (
    <PageMobile title="Danh sách người dùng">
      <FilterUser />
      <UserList />
    </PageMobile>
  );
};
const UserList = () => {
  const { userList, onViewDetail } = useContext(UserListContext);
  return (
    <Box>
      {!userList || !userList.length ? (
        <NoUser />
      ) : (
        <>
          <Box px={1.5} mb={2}>
            {userList.map((user) => (
              <User user={user} onViewDetail={onViewDetail} />
            ))}
          </Box>
          <Pagination />
        </>
      )}
    </Box>
  );
};

type OrderProps = {
  user: IUserRow;
  onViewDetail: (row: IUserRow) => void;
};
const User: React.FC<OrderProps> = ({ user, onViewDetail }) => {
  return (
    <BoxWrapperOrder bgColor={grey["200"]} onClick={() => onViewDetail(user)}>
      <Typography sx={{ fontSize: 16, opacity: 0.75 }}>
        {"Tài khoản: "}
        <Typography
          component={"span"}
          style={{ fontWeight: 550, fontSize: 18 }}
        >
          {user.username}
        </Typography>
      </Typography>
      <Typography sx={{ fontSize: 16, opacity: 0.75 }}>
        {"Họ tên: "}
        <Typography
          component={"span"}
          style={{ fontWeight: 550, fontSize: 18 }}
        >
          {user.fullname}
        </Typography>
      </Typography>
      <Typography sx={{ fontSize: 16, opacity: 0.75 }}>
        {"SĐT: "}
        <Typography
          component={"span"}
          style={{ fontWeight: 550, fontSize: 18 }}
        >
          {user.phone_number}
        </Typography>
      </Typography>
      <Typography sx={{ fontSize: 16, opacity: 0.75 }}>
        {"Công ty: "}
        <Typography
          component={"span"}
          style={{ fontWeight: 550, fontSize: 18 }}
        >
          {user.company_name}
        </Typography>
      </Typography>

      {/* arrow in the right */}
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          transform: "translateY(-40%)",
          right: "10px",
          borderRadius: "50%",
          backgroundColor: `#cccccc${OPACITY_TO_HEX["25"]}`,
          padding: 1,
          ...alignCenterSx,
        }}
      >
        <IcOutlineNavigateNext />
      </Box>
    </BoxWrapperOrder>
  );
};

const Pagination = () => {
  const { pagination, setParams } = useContext(UserListContext);
  const handleChange = (_event: React.ChangeEvent<unknown>, value: number) => {
    setParams("page", value);
  };
  return (
    <Box my={1}>
      <BasePagi
        currentPage={pagination?.currentPage}
        totalPages={pagination?.totalPages}
        onChange={handleChange}
      />
    </Box>
  );
};

const NoUser = () => {
  return (
    <Box width={"100%"} minHeight={"300px"} sx={{ ...alignCenterSx }}>
      <Typography fontSize={{ xs: 24, sm: 30 }} fontWeight={550}>
        Không có người dùng nào
      </Typography>
    </Box>
  );
};
const BoxWrapperOrder = styled(Box, {
  shouldForwardProp: (prop) => prop !== "bgColor",
})<{ bgColor: string }>(({ bgColor }) => ({
  marginTop: "2px",
  padding: "10px",
  backgroundColor: bgColor,
  position: "relative",

  borderRadius: 8,
  marginBottom: 8,
}));

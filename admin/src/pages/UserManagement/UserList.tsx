import { useNavigate } from "react-router-dom";
import { Page } from "../../components/Page/Page";
import { CustomTableWithFilter } from "../../components/Table/CustomTableWithFilter";
import { StrictField } from "../../components/Table/Customtable";
import SCREEN_PATHS from "../../shared/constants/screenPaths";
import { screenPathRemoveSlug } from "../../shared/helper";
import { IUserList } from "../../shared/types/user";

const fields: StrictField<IUserList>[] = [
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
export const UserList = () => {
  const navigate = useNavigate()
  const onViewDetail = ({ id }: IUserList) => {
    let newPathWithoutSlug = screenPathRemoveSlug(
      SCREEN_PATHS.USER.DETAIL
    );
    navigate(`${newPathWithoutSlug}/${id}`);
  };
  return (
    <Page title="Danh sách người dùng">
      <CustomTableWithFilter
        createRoute={SCREEN_PATHS.USER.CREATE}
        fields={fields}
        apiEndPoint="user"
        onViewDetail={onViewDetail}
      />
    </Page>
  );
};

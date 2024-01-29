import { Page } from "../../components/Page/Page";
import { CustomTableWithFilter } from "../../components/Table/CustomTableWithFilter";
import { StrictField } from "../../components/Table/Customtable";
import { IUserList } from "../../shared/types/user";

export interface EggForm {
  formId: string;
  dateCreated: Date | string;
  timeCreated: Date | string;
  totalPrice: number;
  status: string;
}

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
export const EggOrderList = () => {
  return (
    <Page title="Danh sách đơn trứng">
      <CustomTableWithFilter fields={fields} apiEndPoint="user" />
    </Page>
  );
};

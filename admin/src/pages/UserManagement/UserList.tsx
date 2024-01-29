import { useEffect, useState } from "react";
import { Page } from "../../components/Page/Page";
import { CustomTable, StrictField } from "../../components/Table/Customtable";
import { getApi } from "../../lib/utils/fetch/fetchRequest";
import { IUserList } from "../../shared/types/user";

const fields: StrictField<IUserList>[] = [
  {
    header: "Id",
    fieldKey: "id",
  },
  {
    header: "User name",
    fieldKey: "username",
  },
  {
    header: "Phone number",
    fieldKey: "phone_number",
  },
  {
    header: "Full name",
    fieldKey: "fullname",
  },
  {
    header: "Company",
    fieldKey: "company_name",
  },
];
export const UserList = () => {
  const [listUsers, setListUsers] = useState<IUserList[]>([]);

  useEffect(() => {
    async function fetchUser() {
      const res = await getApi("user");
      setListUsers(res.data);
    }
    fetchUser();
  }, []);
  return (
    <Page title="Danh sách người dùng">
      <CustomTable fields={fields} data={listUsers} />
    </Page>
  );
};

// const eggOrderData: EggForm&StrictField = listOrders.map((order)=>{...order,header: })

import { Grid } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Page } from "../../components/Page/Page";
import { getApi } from "../../lib/utils/fetch/fetchRequest";
import { IUserProfile } from "../../shared/types/user";
import { ClientDetailAccount } from "./ClientDetailAccount";
import { ClientDetailInformation } from "./ClientDetailInformation";
import { ClientDetailOrderOverview } from "./ClientDetailOrderOverview";
import { ClientDetailRecentOrder } from "./ClientDetailRecentOrder";

// user infor, account and reset password
export const ClientDetail = () => {
  const [client, setClient] = useState<IUserProfile | null>(null);
  const params = useParams();

  useEffect(() => {
    async function fetchClient() {
      const response = await getApi<IUserProfile>(`user/${params?.id}`);
      if (response.success) setClient(response.data);
    }
    fetchClient()
  }, []);
  return (
    <Page title="Chi tiết người dùng">
      {!client ? (
        <p>No data</p>
      ) : (
        <Grid container spacing={{ xs: 2, sm: 3 }}>
          <Grid item xs={12} sm={6}>
            <ClientDetailAccount username={client.username} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <ClientDetailInformation {...client} />
          </Grid>

          <Grid item xs={12}>
            <ClientDetailOrderOverview />
          </Grid>

          <Grid item xs={12}>
            <ClientDetailRecentOrder />
          </Grid>
        </Grid>
      )}
    </Page>
  );
};

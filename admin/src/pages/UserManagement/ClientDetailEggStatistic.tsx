import { Box, Paper, Stack, Typography, styled } from "@mui/material";
import { useEffect, useState } from "react";
import { ClientDetailEggStatisticChart } from "./ClientDetailEggStatisticChart";
import { getApi } from "../../lib/utils/fetch/fetchRequest";
import { useParams } from "react-router-dom";

export type TPieChartData = {
  labels: string[];
  totalDatas: number[];
  qtyDatas: number[];
};
const defauttData = {
  labels: [],
  totalDatas: [],
  qtyDatas: [],
};

export const ClientDetailEggStatistic = () => {
  const [data, setData] = useState<TPieChartData>(defauttData);
  const params = useParams()
  // list egg by total and quantity
  useEffect(() => {
    async function fetchData() {
      const res = await getApi<TPieChartData>(
        `user/client-order-egg-statistic/${parseInt(params.id as string)}`
      );
      if (res.success) {
        console.log(res.data);
        setData(res.data);
      }
    }
    fetchData();
  }, []);
  return (
    <Paper elevation={4} sx={{ padding: 2 }}>
      <Stack
        direction={"row"}
        justifyContent={"space-between"}
        alignItems={"center"}
      >
        <BoxTitle>{"Các loại trứng đã mua"}</BoxTitle>
      </Stack>
      <ClientDetailEggStatisticChart data={data} />
    </Paper>
  );
};
const BoxTitle = styled(Typography)(({ theme }) => ({
  fontWeight: 700,
  fontSize: 18,
  marginBottom: 16,
  [theme.breakpoints.up("sm")]: {},
}));
const BoxContent = styled(Box)(({ theme }) => ({
  marginBottom: 8,
  [theme.breakpoints.up("sm")]: {},
}));

const BoxFieldName = styled(Typography)(({ theme }) => ({
  fontSize: 15,
  opacity: 0.9,
  [theme.breakpoints.up("sm")]: {},
}));

const BoxFieldValue = styled(Typography)(({ theme }) => ({
  fontWeight: 500,
  opacity: 0.9,

  [theme.breakpoints.up("sm")]: {},
}));

import { Box, Grid, Paper, Stack, Typography, styled } from "@mui/material";
import { BoxAnnotate } from "../../components/Box/BoxAnnotate";
import {
  IcBaselineArrowDropUp,
  IcOutlineNavigateNext,
} from "../../shared/icons/Icon";
import {
  RowStatisticStyled,
  StackAlignCenterJustifySpaceBetween,
  alignCenterSx,
} from "../../styled/styled";
import { BoxStatisticWithTimeRange } from "../../components/Box/BoxStatisticWithTimeRange";
import { DateTabs } from "./DateTabs";
import dayjs, { Dayjs } from "dayjs";
import { useEffect, useState } from "react";
import { useDevice } from "../../hooks/useDevice";
import { CustomDatePicker } from "../../components/DateRange/CustomDatePicker";
import { getApi } from "../../lib/utils/fetch/fetchRequest";
import { CONFIG } from "../../shared/constants/common";
import { IEggPrice } from "../../shared/types/egg-price-qty";

export const EggPricesBlock = () => {
  const today = dayjs();
  const [isChooseDateActive, setIsChooseDateActive] = useState(false);
  const [date, setDate] = useState<Dayjs>(today);
  const { isMobile } = useDevice();
  const [eggPrices, setEggPrices] = useState<IEggPrice[]>([]);

  const onDateTabsChange = (newDate: Dayjs | null) => {
    if (newDate) {
      setDate(newDate);
      setIsChooseDateActive(false);
    } else {
      setIsChooseDateActive(true);
    }
  };
  const onDatePickerChange = (newDate: Dayjs) => {
    setDate(newDate);
  };
  useEffect(() => {
    async function fetchOverviewData() {
      const response = await getApi<IEggPrice[]>(
        "statistic/egg-price-qty-by-date",
        {
          date: dayjs(date).format(CONFIG.MY_SQL_DATE_FORMAT),
          yesterday: dayjs(date)
            .subtract(1, "day")
            .format(CONFIG.MY_SQL_DATE_FORMAT),
        }
      );

      if (response.success) setEggPrices(response.data);
    }
    fetchOverviewData();
  }, [date]);
  return (
    <Paper elevation={isMobile ? 0 : 4}>
      <BoxStatisticWithTimeRange
        boxProps={{ sx: { backgroundColor: isMobile ? "" : "white" } }}
        chooseTimeElement={<DateTabs onChange={onDateTabsChange} />}
        rightElementInTitleRow={
          <Box sx={{ ...alignCenterSx }}>
            <Typography
              style={{ marginLeft: 8, fontWeight: 500, color: "green" }}
            >
              35đ
            </Typography>
            <IcBaselineArrowDropUp color="green" style={{ fontSize: 25 }} />
          </Box>
        }
        title="Giá trứng theo ngày"
      >
        <Box marginTop={1.25}>
          <CustomDatePicker
            date={date}
            onChange={onDatePickerChange}
            isActive={isChooseDateActive}
          />
          <Box mt={1}>
            <Grid
              sx={{ width: { sm: "100%", md: "90%", lg: "75%" } }}
              container
            >
              <Grid item xs={2.5} sm={3}></Grid>
              <Grid item xs={2.5}>
                <BoxAnnotate color="black" fieldName="Delco" />
              </Grid>
              <Grid item xs={4} sm={3.5}>
                <BoxAnnotate color="purple" fieldName="Thị trường" />
              </Grid>
              <Grid item xs={2.5}>
                <BoxAnnotate color="blue" fieldName="CP" />
              </Grid>
            </Grid>
            {eggPrices.map((item) => (
              <RowStatisticStyled>
                <StackAlignCenterJustifySpaceBetween>
                  <Row
                    type_name={item.egg.type_name}
                    price_1={(item.price_1 as string) || "--"}
                    price_2={(item.price_2 as string) || "--"}
                    price_3={(item.price_3 as string) || "--"}
                  />
                  <IcOutlineNavigateNext />
                </StackAlignCenterJustifySpaceBetween>
              </RowStatisticStyled>
            ))}
          </Box>
        </Box>
      </BoxStatisticWithTimeRange>
    </Paper>
  );
};

type RowProps = {
  type_name: string;
  price_1: string;
  price_2: string;
  price_3: string;
};
const Row = ({ type_name, price_1, price_2, price_3 }: RowProps) => {
  return (
    <Grid sx={{ width: { sm: "70%", md: "70%" } }} container>
      <Grid item xs={3}>
        <Typography sx={{ fontWeight: 500, fontSize: 18 }}>
          {type_name}
        </Typography>
      </Grid>

      <Grid item xs={3}>
        <TextPrice>{price_1}</TextPrice>
      </Grid>
      <Grid item xs={3}>
        <TextPrice color={"purple"}>{price_2}</TextPrice>
      </Grid>
      <Grid item xs={3}>
        <TextPrice color={"blue"}>{price_3}</TextPrice>
      </Grid>
    </Grid>
  );
};

const TextPrice = styled(Typography)(({ theme }) => ({
  fontWeight: 650,
  fontSize: 18,
  [theme.breakpoints.up("sm")]: {},
}));

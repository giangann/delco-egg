import { Box, Stack, Typography } from "@mui/material";
import dayjs, { Dayjs } from "dayjs";
import { useEffect, useState } from "react";
import { BoxStatisticWithTimeRange } from "../../components/Box/BoxStatisticWithTimeRange";
import { NoOrderBox } from "../../components/Box/NoOrderBox";
import { ProfitAndLossBox } from "../../components/Box/ProfitAndLossBox";
import { CustomDatePicker } from "../../components/DateRange/CustomDatePicker";
import { getApi } from "../../lib/utils/fetch/fetchRequest";
import { CONFIG } from "../../shared/constants/common";
import { numberWithComma } from "../../shared/helper";
import { IcOutlineNavigateNext } from "../../shared/icons/Icon";
import {
  RowStatisticStyled,
  StackAlignCenterJustifySpaceBetween,
} from "../../styled/styled";
import { DateTabs } from "./DateTabs";
import { useDevice } from "../../hooks/useDevice";

type TOverview = {
  sumTotal: number;
  sumQty: number;
  toDayAverage: number;
  diffAvg: number;
};
const defaultData = {
  sumTotal: 0,
  sumQty: 0,
  toDayAverage: 0,
  diffAvg: 0,
};
export const TodayOverview = () => {
  const today = dayjs();
  const [date, setDate] = useState<Dayjs>(today);
  const [overview, setOverview] = useState<TOverview>(defaultData);
  const [isChooseDateActive, setIsChooseDateActive] = useState(false);
  const isNoSuccessOrder = overview.sumTotal === 0 && overview.sumQty === 0;

  const onDatePickerChange = (newDate: Dayjs) => {
    setDate(newDate);
  };

  const onDateTabsChange = (newDate: Dayjs | null) => {
    if (newDate) {
      setDate(newDate);
      setIsChooseDateActive(false);
    } else {
      setIsChooseDateActive(true);
    }
  };

  useEffect(() => {
    async function fetchOverviewData() {
      const response = await getApi<TOverview>("statistic/overview-by-date", {
        date: dayjs(date).format(CONFIG.MY_SQL_DATE_FORMAT),
        yesterday: dayjs(date)
          .subtract(1, "day")
          .format(CONFIG.MY_SQL_DATE_FORMAT),
      });

      if (response.success) setOverview(response.data);
    }
    fetchOverviewData();
  }, [date]);
  return (
    <BoxStatisticWithTimeRange
      chooseTimeElement={<DateTabs onChange={onDateTabsChange} />}
      title="Tổng quan"
    >
      <>
        <CustomDatePicker
          date={date}
          onChange={onDatePickerChange}
          isActive={isChooseDateActive}
        />
        {isNoSuccessOrder ? (
          <NoOrderBox />
        ) : (
          <OverviewTable overview={overview} date={date} />
        )}
      </>
    </BoxStatisticWithTimeRange>
  );
};

const OverviewTable = ({
  overview,
  date,
}: {
  date: Dayjs;
  overview: TOverview;
}) => {
  return (
    <Box marginTop={1.25}>
      <RowStatisticStyled>
        <StackAlignCenterJustifySpaceBetween>
          <Typography sx={{ fontWeight: 500, fontSize: 18 }}>
            Tổng doanh thu{": "}
            <span style={{ fontWeight: 650 }}>
              {numberWithComma(overview.sumTotal)} đ
            </span>
          </Typography>
          <IcOutlineNavigateNext />
        </StackAlignCenterJustifySpaceBetween>
      </RowStatisticStyled>

      <RowStatisticStyled>
        {" "}
        <StackAlignCenterJustifySpaceBetween>
          <Typography sx={{ fontWeight: 500, fontSize: 18 }}>
            Tổng trứng xuất{": "}
            <span style={{ fontWeight: 650 }}>
              {numberWithComma(overview.sumQty)}{" "}
            </span>
            quả
          </Typography>
          <IcOutlineNavigateNext />
        </StackAlignCenterJustifySpaceBetween>{" "}
      </RowStatisticStyled>

      <Stack direction="row" spacing={1}>
        <Typography sx={{ fontWeight: 500, fontSize: 18 }}>
          Trung bình{": "}
          <span style={{ fontWeight: 650 }}>{overview.toDayAverage} đ/quả</span>
          {/* <span>{"so với hôm qua"}</span> */}
        </Typography>
        <ProfitAndLossBox
          value={Number(overview.diffAvg)}
          suffix="đ"
          toolTipText={`So với ${dayjs(date)
            .subtract(1, "day")
            .format(CONFIG.VIEWR_DATE_FORMAT)}`}
        />
      </Stack>
    </Box>
  );
};

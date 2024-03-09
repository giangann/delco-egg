import { Box, Stack, Typography } from "@mui/material";
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
import { useState } from "react";

export const EggPricesBlock = () => {
  const today = dayjs();
  const [isChooseDateActive, setIsChooseDateActive] = useState(false);
  const [date, setDate] = useState<Dayjs>(today);

  const onDateTabsChange = (newDate: Dayjs | null) => {
    if (newDate) {
      setDate(newDate);
      setIsChooseDateActive(false);
    } else {
      setIsChooseDateActive(true);
    }
  };
  return (
    <BoxStatisticWithTimeRange
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
      title="Giá trứng hôm nay"
    >
      <Box marginTop={1.25}>
        <Stack direction={"row"} spacing={3} ml={7}>
          <BoxAnnotate color="black" fieldName="Delco" />
          <BoxAnnotate color="purple" fieldName="Thị trường" />
          <BoxAnnotate color="blue" fieldName="CP" />
        </Stack>
        {[1, 2, 3, 4].map((item) => (
          <RowStatisticStyled>
            <StackAlignCenterJustifySpaceBetween>
              <Typography sx={{ fontWeight: 500, fontSize: 18 }}>
                Mix {item}
                {":"}
                <span style={{ marginLeft: 12, fontWeight: 650 }}>2300 đ</span>
                <span
                  style={{
                    marginLeft: 12,
                    fontWeight: 650,
                    color: "purple",
                  }}
                >
                  2300 đ
                </span>
                <span
                  style={{
                    marginLeft: 12,
                    fontWeight: 650,
                    color: "blue",
                  }}
                >
                  2300 đ
                </span>
              </Typography>
              <IcOutlineNavigateNext />
            </StackAlignCenterJustifySpaceBetween>
          </RowStatisticStyled>
        ))}
      </Box>
    </BoxStatisticWithTimeRange>
  );
};
